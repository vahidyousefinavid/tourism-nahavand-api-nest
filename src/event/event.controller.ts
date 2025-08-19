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
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/events',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
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
  async create(@UploadedFile() file: Express.Multer.File, @Body('dto') dto: string) {
    console.log(JSON.parse(dto));

    let parsedDto: CreateEventDto;
    try {
      parsedDto = JSON.parse(dto);
    } catch (err) {
      parsedDto = {} as CreateEventDto;
    }

    if (file) {
      parsedDto.image = `/uploads/events/${file.filename}`;
    }

    // اگر timeRanges هنوز رشته است، parse کنیم
    if (parsedDto.timeRanges && typeof parsedDto.timeRanges === 'string') {
      try {
        parsedDto.timeRanges = JSON.parse(parsedDto.timeRanges);
      } catch (err) {
        parsedDto.timeRanges = [];
      }
    }

    return this.eventService.create(parsedDto);
  }


  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/events',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('dto') dto: string,  // <-- اینجا dto رو به صورت رشته میگیریم
  ) {
    let parsedDto: UpdateEventDto;
    try {
      parsedDto = JSON.parse(dto);
    } catch (err) {
      parsedDto = {} as UpdateEventDto;
    }

    if (file) {
      parsedDto.image = `/uploads/events/${file.filename}`;
    }

    // اگر timeRanges هنوز رشته است، parse کنیم
    if (parsedDto.timeRanges && typeof parsedDto.timeRanges === 'string') {
      try {
        parsedDto.timeRanges = JSON.parse(parsedDto.timeRanges);
      } catch (err) {
        parsedDto.timeRanges = [];
      }
    }

    console.log(parsedDto); // حالا کامل خواهد بود
    return this.eventService.update(id, parsedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(id);
  }
}
