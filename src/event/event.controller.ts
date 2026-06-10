import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/events',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          cb(new Error('فایل تصویر معتبر نیست'), false);
        } else {
          cb(null, true);
        }
      },
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body('dto') dto: string,
  ) {
    let parsedDto: CreateEventDto;
    try {
      parsedDto = JSON.parse(dto);
    } catch (err) {
      parsedDto = {} as CreateEventDto;
    }

    if (file) parsedDto.image = `/uploads/events/${file.filename}`;

    if (parsedDto.timeRanges && typeof parsedDto.timeRanges === 'string') {
      try {
        parsedDto.timeRanges = JSON.parse(parsedDto.timeRanges);
      } catch (err) {
        parsedDto.timeRanges = [];
      }
    }

    return this.eventService.create(parsedDto);
  }

  // ✅ حالا از pagination پشتیبانی می‌کند
  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.eventService.findAll(+page, +limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @Post(':id/view')
  incrementView(@Param('id') id: string) {
    return this.eventService.incrementView(id);
  }

  // ✅ متد جدید: ۷ ایونت با بیشترین بازدید
  @Get('/top/views')
  getTopByViews() {
    return this.eventService.getTopByViews();
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/events',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('dto') dto: string,
  ) {
    let parsedDto: UpdateEventDto;
    try {
      parsedDto = JSON.parse(dto);
    } catch (err) {
      parsedDto = {} as UpdateEventDto;
    }

    if (file) parsedDto.image = `/uploads/events/${file.filename}`;

    if (parsedDto.timeRanges && typeof parsedDto.timeRanges === 'string') {
      try {
        parsedDto.timeRanges = JSON.parse(parsedDto.timeRanges);
      } catch (err) {
        parsedDto.timeRanges = [];
      }
    }

    return this.eventService.update(id, parsedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(id);
  }
}
