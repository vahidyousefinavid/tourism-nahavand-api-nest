import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepo: Repository<Location>,
  ) {}

  async create(dto: CreateLocationDto) {
    const location = this.locationRepo.create(dto);
    return await this.locationRepo.save(location);
  }

  async findAll() {
    return await this.locationRepo.find();
  }

  async findOne(id: string) {
    const location = await this.locationRepo.findOne({ where: { id } });
    if (!location) throw new NotFoundException('Location not found');
    return location;
  }

  async update(id: string, dto: UpdateLocationDto) {
    const location = await this.findOne(id);
    Object.assign(location, dto);
    return await this.locationRepo.save(location);
  }

  async remove(id: string) {
    const location = await this.findOne(id);
    return await this.locationRepo.remove(location);
  }
}
