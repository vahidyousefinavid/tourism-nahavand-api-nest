import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepo: Repository<Location>,
  ) { }

  async create(dto: CreateLocationDto) {
    const location = this.locationRepo.create(dto);
    return this.locationRepo.save(location);
  }

  // ✅ حالا pagination دارد
  async findAll(page = 1, limit = 10) {
    const [data, total] = await this.locationRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' }, // اگر ستون createdAt داری
    });

    return {
      data,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const location = await this.locationRepo.findOne({ where: { id } });
    if (!location) throw new NotFoundException('Location not found');
    return location;
  }

  async incrementView(id: string) {
    await this.locationRepo.increment({ id }, 'views', 1);
  }

  async update(id: string, dto: UpdateLocationDto) {
    const location = await this.findOne(id);

    if (dto.images && dto.images.length) {
      if (location.images && location.images.length) {
        location.images.forEach((img) => {
          const imgPath = path.join(process.cwd(), img);
          if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
        });
      }
    }

    Object.assign(location, dto);
    return this.locationRepo.save(location);
  }

  async remove(id: string) {
    const location = await this.findOne(id);

    if (location.images && location.images.length) {
      location.images.forEach((img) => {
        const imgPath = path.join(process.cwd(), img);
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
      });
    }

    return this.locationRepo.remove(location);
  }

  // ✅ متد جدید: ۷ لوکیشن با بیشترین بازدید
  async getTopByViews() {
    return this.locationRepo.find({
      order: { views: 'DESC' }, // مطمئن شو ستون views داری
      take: 7,
    });
  }
}
