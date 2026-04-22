import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Body,
  Param,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { InvestmentOpportunityService } from './investment-opportunity.service';
import { CreateInvestmentOpportunityDto } from './dto/create-investment.dto';
import { UpdateInvestmentOpportunityDto } from './dto/update-investment.dto';

@Controller('investment-opportunities')
export class InvestmentOpportunityController {
  constructor(private service: InvestmentOpportunityService) {}

  @Post()
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads/investments',
        filename: (req, file, cb) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, unique + extname(file.originalname));
        },
      }),
    }),
  )
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('dto') dto: string,
  ) {
    const parsed: CreateInvestmentOpportunityDto = JSON.parse(dto);
    parsed.images = files
      .filter((f) => f.mimetype.includes('image'))
      .map((f) => `/uploads/investments/${f.filename}`);
    parsed.attachments = files
      .filter((f) => f.mimetype.includes('pdf'))
      .map((f) => `/uploads/investments/${f.filename}`);

    return this.service.create(parsed);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.service.findAll(query);
  }

  @Get('/top')
  getTop() {
    return this.service.getTop();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads/investments',
        filename: (req, file, cb) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, unique + extname(file.originalname));
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body('dto') dto: string,
  ) {
    const parsed: UpdateInvestmentOpportunityDto = JSON.parse(dto);

    if (files && files.length > 0) {
      parsed.images = files
        .filter((f) => f.mimetype.includes('image'))
        .map((f) => `/uploads/investments/${f.filename}`);

      parsed.attachments = files
        .filter((f) => f.mimetype.includes('pdf'))
        .map((f) => `/uploads/investments/${f.filename}`);
    }

    return this.service.update(id, parsed);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
