import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventTimeRange } from './entities/event-time-range.entity';
import { CreateEventTimeRangeDto, UpdateEventTimeRangeDto } from './dto/event-time-range.dto';
import { Event } from '../event/entities/event.entity';

@Injectable()
export class EventTimeRangeService {
  constructor(
    @InjectRepository(EventTimeRange)
    private readonly timeRangeRepo: Repository<EventTimeRange>,
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
  ) {}

  async create(dto: CreateEventTimeRangeDto) {
    const event = await this.eventRepo.findOne({ where: { id: dto.eventId } });
    if (!event) throw new NotFoundException('Event not found');

    const timeRange = this.timeRangeRepo.create({ ...dto, event });
    return await this.timeRangeRepo.save(timeRange);
  }

  async findAll() {
    return await this.timeRangeRepo.find({ relations: ['event'] });
  }

  async findOne(id: string) {
    const timeRange = await this.timeRangeRepo.findOne({ where: { id }, relations: ['event'] });
    if (!timeRange) throw new NotFoundException('Time range not found');
    return timeRange;
  }

  async update(id: string, dto: UpdateEventTimeRangeDto) {
    const timeRange = await this.findOne(id);
    Object.assign(timeRange, dto);
    return await this.timeRangeRepo.save(timeRange);
  }

  async remove(id: string) {
    const timeRange = await this.findOne(id);
    return await this.timeRangeRepo.remove(timeRange);
  }
}
