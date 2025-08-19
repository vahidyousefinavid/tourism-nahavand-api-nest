import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ConflictException } from '@nestjs/common';

describe('CustomerService', () => {
  let service: CustomerService;
  let customerRepositoryMock: any;

  beforeEach(async () => {
    customerRepositoryMock = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: getRepositoryToken(Customer),
          useValue: customerRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // test create service
  it('should create a customer', async () => {
    const createDto: CreateCustomerDto = {
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: new Date('1990-01-01'),
      phoneNumber: '1234567890',
      email: 'john@example.com',
      bankAccountNumber: '987654321',
    };

    const savedCustomer = {
      id: 'some-uuid',
      ...createDto,
    };

    customerRepositoryMock.findOne.mockResolvedValueOnce(null);
    customerRepositoryMock.findOne.mockResolvedValueOnce(null);
    customerRepositoryMock.create.mockReturnValue(savedCustomer);
    customerRepositoryMock.save.mockResolvedValue(savedCustomer);

    const result = await service.create(createDto);

    expect(result).toEqual(savedCustomer);
    expect(customerRepositoryMock.findOne).toHaveBeenCalledTimes(2);
    expect(customerRepositoryMock.create).toHaveBeenCalledWith(createDto);
    expect(customerRepositoryMock.save).toHaveBeenCalledWith(savedCustomer);
  });

  // test list service 
  it('should return all customers', async () => {
    const customers = [
      {
        id: 'uuid-1',
        firstName: 'Alice',
        lastName: 'Smith',
        dateOfBirth: new Date('1980-05-01'),
        phoneNumber: '1234567890',
        email: 'alice@example.com',
        bankAccountNumber: '111111111',
      },
      {
        id: 'uuid-2',
        firstName: 'Bob',
        lastName: 'Johnson',
        dateOfBirth: new Date('1990-07-15'),
        phoneNumber: '0987654321',
        email: 'bob@example.com',
        bankAccountNumber: '222222222',
      },
    ];

    customerRepositoryMock.find.mockResolvedValue(customers);

    const result = await service.findAll();

    expect(result).toEqual(customers);
    expect(customerRepositoryMock.find).toHaveBeenCalledTimes(1);
  });

  it('should return a customer by ID', async () => {
    const id = 'uuid-123';
    const customer = {
      id,
      firstName: 'Sara',
      lastName: 'Doe',
      dateOfBirth: new Date('1995-04-15'),
      phoneNumber: '1234567890',
      email: 'sara@example.com',
      bankAccountNumber: '55555555',
    };

    customerRepositoryMock.findOne.mockResolvedValue(customer);

    const result = await service.findOne(id);

    expect(result).toEqual(customer);
    expect(customerRepositoryMock.findOne).toHaveBeenCalledWith({ where: { id } });
  });

  it('should update customer successfully', async () => {
    const id = 'uuid-1';
    const existingCustomer = {
      id,
      firstName: 'Ali',
      lastName: 'Rezaei',
      dateOfBirth: new Date('1990-01-01'),
      phoneNumber: '09121234567',
      email: 'ali@example.com',
      bankAccountNumber: '1111111',
    };

    const updateDto = {
      email: 'ali.new@example.com',
    };

    customerRepositoryMock.findOne
      .mockResolvedValueOnce(existingCustomer)
      .mockResolvedValueOnce(null);

    customerRepositoryMock.save.mockResolvedValue({
      ...existingCustomer,
      ...updateDto,
    });

    const result = await service.update(id, updateDto);

    expect(result.email).toBe(updateDto.email);
    expect(customerRepositoryMock.save).toHaveBeenCalledWith(expect.objectContaining(updateDto));
  });

  it('should throw ConflictException if email already exists', async () => {
    const id = 'uuid-1';
    const existingCustomer = {
      id,
      firstName: 'Ali',
      lastName: 'Rezaei',
      dateOfBirth: new Date('1990-01-01'),
      phoneNumber: '09121234567',
      email: 'ali@example.com',
      bankAccountNumber: '1111111',
    };

    const updateDto = {
      email: 'existing@example.com',
    };

    customerRepositoryMock.findOne
      .mockResolvedValueOnce(existingCustomer)
      .mockResolvedValueOnce({ id: 'uuid-2' });

    await expect(service.update(id, updateDto)).rejects.toThrow(ConflictException);
  });

  it('should not overwrite existing fields with undefined values', async () => {
    const id = 'uuid-1';
    const existingCustomer = {
      id,
      firstName: 'Ali',
      lastName: 'Rezaei',
      dateOfBirth: new Date('1990-01-01'),
      phoneNumber: '09121234567',
      email: 'ali@example.com',
      bankAccountNumber: '1111111',
    };

    const updateDto = {
      email: undefined,
      phoneNumber: '09351234567',
    };

    customerRepositoryMock.findOne
      .mockResolvedValueOnce(existingCustomer)
      .mockResolvedValueOnce(null);

    customerRepositoryMock.save.mockResolvedValue({
      ...existingCustomer,
      phoneNumber: updateDto.phoneNumber,
    });

    const result = await service.update(id, updateDto);

    expect(result.email).toBe(existingCustomer.email);
    expect(result.phoneNumber).toBe(updateDto.phoneNumber);
  });

  it('should remove a customer successfully', async () => {
    const id = 'uuid-123';
    const existingCustomer = {
      id,
      firstName: 'Reza',
      lastName: 'Alavi',
      dateOfBirth: new Date('1990-01-01'),
      phoneNumber: '09121234567',
      email: 'reza@example.com',
      bankAccountNumber: '12345678',
    };

    customerRepositoryMock.findOne.mockResolvedValueOnce(existingCustomer);
    customerRepositoryMock.remove.mockResolvedValueOnce(undefined); // چون void هست

    await expect(service.remove(id)).resolves.toBeUndefined();

    expect(customerRepositoryMock.findOne).toHaveBeenCalledWith({ where: { id } });
    expect(customerRepositoryMock.remove).toHaveBeenCalledWith(existingCustomer);
  });
});
