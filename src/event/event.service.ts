import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
  ) { }

  async create(dto: CreateEventDto) {
    const event = this.eventRepo.create(dto);
    return this.eventRepo.save(event);
  }

  // ✅ حالا pagination دارد
  async findAll(page = 1, limit = 10) {
    const [data, total] = await this.eventRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' }, // مطمئن شو ستون createdAt داری
      relations: ['timeRanges'],
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
    const event = await this.eventRepo.findOne({ where: { id }, relations: ['timeRanges'] });
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  async incrementView(id: string) {
    await this.eventRepo.increment({ id }, 'views', 1);
  }

  async update(id: string, dto: UpdateEventDto) {
    const event = await this.findOne(id);

    if (dto.image && event.image && dto.image !== event.image) {
      const oldImagePath = path.join(process.cwd(), event.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    Object.assign(event, dto);
    return this.eventRepo.save(event);
  }

  async remove(id: string) {
    const event = await this.findOne(id);

    if (event.image) {
      const imagePath = path.join(process.cwd(), event.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    return this.eventRepo.remove(event);
  }

  // ✅ متد جدید: ۷ ایونت پر بازدید
  async getTopByViews() {
    return this.eventRepo.find({
      order: { views: 'DESC' }, // مطمئن شو ستون views داری
      take: 7,
      relations: ['timeRanges'],
    });
  }
}
