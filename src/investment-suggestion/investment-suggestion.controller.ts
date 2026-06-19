import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { InvestmentSuggestionService } from './investment-suggestion.service';
import { CreateInvestmentSuggestionDto } from './dto/create-investment-suggestion.dto';
import { UpdateSuggestionStatusDto } from './dto/update-suggestion-status.dto';

@Controller('investment-suggestions')
export class InvestmentSuggestionController {
  constructor(private readonly service: InvestmentSuggestionService) {}

  // ثبت پیشنهاد توسط شهروند (عمومی)
  @Post()
  create(@Body() dto: CreateInvestmentSuggestionDto) {
    return this.service.create(dto);
  }

  // لیست همه پیشنهادات (پنل ادمین)
  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 20,
    @Query('status') status?: string,
  ) {
    return this.service.findAll(+page, +limit, status);
  }

  // آمار تعداد به تفکیک وضعیت
  @Get('stats')
  stats() {
    return this.service.countByStatus();
  }

  // جزئیات یک پیشنهاد
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  // تغییر وضعیت توسط ادمین
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateSuggestionStatusDto) {
    return this.service.updateStatus(id, dto);
  }

  // حذف
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
