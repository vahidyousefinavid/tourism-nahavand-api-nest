import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  // Check email uniqueness, optionally excluding a customer by ID (for update)
  private async checkEmailUniqueness(email: string, excludeId?: string) {
    const existing = await this.customerRepository.findOne({ where: { email } });
    if (existing && existing.id !== excludeId) {
      throw new ConflictException('Email already exists');
    }
  }

  // Check combination of firstName, lastName, and dateOfBirth uniqueness
  private async checkNameDobUniqueness(
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    excludeId?: string,
  ) {
    const existing = await this.customerRepository.findOne({
      where: { firstName, lastName, dateOfBirth },
    });
    if (existing && existing.id !== excludeId) {
      throw new ConflictException('Customer with the same name and date of birth already exists');
    }
  }

  // Normalize date by resetting time part to 00:00:00 for consistent comparison
  private normalizeDate(input: Date | string): Date {
    const date = input instanceof Date ? new Date(input) : new Date(input);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  async create(createDto: CreateCustomerDto): Promise<Customer> {
    await this.checkEmailUniqueness(createDto.email);

    const dob = this.normalizeDate(createDto.dateOfBirth);
    await this.checkNameDobUniqueness(createDto.firstName, createDto.lastName, dob);

    const customer = this.customerRepository.create({ ...createDto, dateOfBirth: dob });

    try {
      return await this.customerRepository.save(customer);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Duplicate entry detected in database.');
      }
      throw error;
    }
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  async findOne(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }
    return customer;
  }

  async update(id: string, updateDto: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.findOne(id);

    // Check email uniqueness if changed
    if (updateDto.email && updateDto.email !== customer.email) {
      await this.checkEmailUniqueness(updateDto.email, id);
    }

    // Normalize dates for comparison
    const customerDob = this.normalizeDate(customer.dateOfBirth);
    const incomingDob = updateDto.dateOfBirth ? this.normalizeDate(updateDto.dateOfBirth) : customerDob;

    // Check if firstName, lastName or dateOfBirth changed
    const isNameOrDobChanged =
      (updateDto.firstName && updateDto.firstName !== customer.firstName) ||
      (updateDto.lastName && updateDto.lastName !== customer.lastName) ||
      (updateDto.dateOfBirth && incomingDob.getTime() !== customerDob.getTime());

    // Check uniqueness of name + dob if changed
    if (isNameOrDobChanged) {
      await this.checkNameDobUniqueness(
        updateDto.firstName ?? customer.firstName,
        updateDto.lastName ?? customer.lastName,
        incomingDob,
        id,
      );
    }

    // Remove undefined values from DTO to avoid overwriting with undefined
    const cleanDto = Object.fromEntries(
      Object.entries(updateDto).filter(([_, v]) => v !== undefined),
    );

    Object.assign(customer, cleanDto);

    try {
      return await this.customerRepository.save(customer);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Duplicate entry detected in database.');
      }
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    const customer = await this.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }
    await this.customerRepository.remove(customer);
  }
}
