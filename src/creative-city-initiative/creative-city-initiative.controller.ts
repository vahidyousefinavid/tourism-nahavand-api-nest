import {
  Controller, Get, Post, Put, Delete,
  Body, Param, Query, UploadedFile, UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreativeCityInitiativeService } from './creative-city-initiative.service';
import { CreateCreativeCityInitiativeDto } from './dto/create-creative-city-initiative.dto';
import { UpdateCreativeCityInitiativeDto } from './dto/update-creative-city-initiative.dto';

const imageInterceptor = FileInterceptor('image', {
  storage: diskStorage({
    destination: './uploads/creative-city-initiatives',
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    cb(null, !!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/));
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

@Controller('creative-city-initiatives')
export class CreativeCityInitiativeController {
  constructor(private readonly service: CreativeCityInitiativeService) {}

  @Post()
  @UseInterceptors(imageInterceptor)
  create(@UploadedFile() file: Express.Multer.File, @Body('dto') raw: string) {
    const dto: CreateCreativeCityInitiativeDto = raw ? JSON.parse(raw) : {};
    if (file) dto.imageUrl = `/uploads/creative-city-initiatives/${file.filename}`;
    return this.service.create(dto);
  }

  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 50,
    @Query('sector') sector?: string,
    @Query('status') status?: string,
  ) {
    return this.service.findAll(+page, +limit, sector, status);
  }

  // طرح‌های فعال — برای سایت عمومی
  @Get('active')
  findActive(@Query('sector') sector?: string) {
    return this.service.findActive(sector);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(imageInterceptor)
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('dto') raw: string,
  ) {
    const dto: UpdateCreativeCityInitiativeDto = raw ? JSON.parse(raw) : {};
    if (file) dto.imageUrl = `/uploads/creative-city-initiatives/${file.filename}`;
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
