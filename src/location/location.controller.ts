import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads/locations',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
          cb(new Error('فایل تصویر معتبر نیست'), false);
        } else {
          cb(null, true);
        }
      },
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('dto') dto: string,
  ) {
    let parsedDto: CreateLocationDto;
    try {
      parsedDto = JSON.parse(dto);
    } catch (err) {
      parsedDto = {} as CreateLocationDto;
    }

    parsedDto.images =
      files?.map((f) => `/uploads/locations/${f.filename}`) || [];

    return this.locationService.create(parsedDto);
  }

  // ✅ اضافه شد: پشتیبانی از pagination
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.locationService.findAll(+page, +limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationService.findOne(id);
  }

  // ✅ اضافه شد: ۷ لوکیشن پر بازدید
  @Get('/top/views')
  getTopByViews() {
    return this.locationService.getTopByViews();
  }

  @Put(':id')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads/locations',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body('dto') dto: string,
  ) {
    let parsedDto: UpdateLocationDto;
    try {
      parsedDto = JSON.parse(dto);
    } catch (err) {
      parsedDto = {} as UpdateLocationDto;
    }

    if (files && files.length) {
      parsedDto.images = files.map(
        (file) => `/uploads/locations/${file.filename}`,
      );
    }

    return this.locationService.update(id, parsedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationService.remove(id);
  }
}
