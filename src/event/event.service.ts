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

  async findAll() {    
    return this.eventRepo.find({ relations: ['timeRanges'] });
  }

  async findOne(id: string) {
    const event = await this.eventRepo.findOne({ where: { id }, relations: ['timeRanges'] });
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  async update(id: string, dto: UpdateEventDto) {
    const event = await this.findOne(id);

    // حذف تصویر قبلی در صورت تغییر
    if (dto.image && event.image && dto.image !== event.image) {
      const oldImagePath = path.join(process.cwd(), event.image); // مسیر نسبی به root
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    Object.assign(event, dto);
    return this.eventRepo.save(event);
  }

  async remove(id: string) {
    const event = await this.findOne(id);

    // حذف تصویر در صورت وجود
    if (event.image) {
      const imagePath = path.join(process.cwd(), event.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    return this.eventRepo.remove(event);
  }
}
