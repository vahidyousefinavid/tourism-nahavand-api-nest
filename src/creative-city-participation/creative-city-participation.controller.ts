import { Controller, Get, Post, Delete, Patch, Body, Param, Query } from '@nestjs/common';
import { CreativeCityParticipationService } from './creative-city-participation.service';
import { CreateCreativeCityParticipationDto } from './dto/create-creative-city-participation.dto';
import { UpdateParticipationStatusDto } from './dto/update-status.dto';

@Controller('creative-city-participations')
export class CreativeCityParticipationController {
  constructor(private readonly service: CreativeCityParticipationService) {}

  // ارسال ایده توسط شهروند (عمومی)
  @Post()
  create(@Body() dto: CreateCreativeCityParticipationDto) {
    return this.service.create(dto);
  }

  // لیست درخواست‌ها (ادمین)
  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 20,
    @Query('status') status?: string,
  ) {
    return this.service.findAll(+page, +limit, status);
  }

  // آمار وضعیت‌ها (ادمین)
  @Get('stats')
  stats() {
    return this.service.countByStatus();
  }

  // جزئیات (ادمین)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  // تغییر وضعیت (ادمین)
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateParticipationStatusDto) {
    return this.service.updateStatus(id, dto);
  }

  // حذف (ادمین)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
