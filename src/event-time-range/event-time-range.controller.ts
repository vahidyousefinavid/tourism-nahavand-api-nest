import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { EventTimeRangeService } from './event-time-range.service';
import { CreateEventTimeRangeDto, UpdateEventTimeRangeDto } from './dto/event-time-range.dto';

@Controller('event-time-ranges')
export class EventTimeRangeController {
  constructor(private readonly eventTimeRangeService: EventTimeRangeService) {}

  @Post()
  create(@Body() dto: CreateEventTimeRangeDto) {
    return this.eventTimeRangeService.create(dto);
  }

  @Get()
  findAll() {
    return this.eventTimeRangeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventTimeRangeService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEventTimeRangeDto) {
    return this.eventTimeRangeService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventTimeRangeService.remove(id);
  }
}
