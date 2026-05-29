import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';

@Controller('investments')
export class InvestmentController {
  constructor(private readonly investmentService: InvestmentService) {}

  @Post()
  async create(@Body() dto: CreateInvestmentDto) {
    return this.investmentService.create(dto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.investmentService.findAll(+page, +limit);
  }

  @Get('category/:category')
  findByCategory(@Param('category') category: string) {
    return this.investmentService.findAllByCategory(category);
  }

  @Get('status/:status')
  findByStatus(@Param('status') status: string) {
    return this.investmentService.findAllByStatus(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.investmentService.findOne(id);
  }

  @Get('top/views')
  getTopByViews(@Query('limit') limit: number = 7) {
    return this.investmentService.getTopByViews(limit);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateInvestmentDto) {
    return this.investmentService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.investmentService.remove(id);
  }
}