import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventTimeRange } from './entities/event-time-range.entity';
import { Event } from '../event/entities/event.entity';
import { EventTimeRangeService } from './event-time-range.service';
import { EventTimeRangeController } from './event-time-range.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EventTimeRange, Event])],
  controllers: [EventTimeRangeController],
  providers: [EventTimeRangeService],
})
export class EventTimeRangeModule {}
