import {
  Controller, Get, Post, Put, Delete,
  Body, Param, Query, UploadedFile, UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { NaturePlaceService } from './nature-place.service';
import { CreateNaturePlaceDto } from './dto/create-nature-place.dto';
import { UpdateNaturePlaceDto } from './dto/update-nature-place.dto';

const imageInterceptor = FileInterceptor('image', {
  storage: diskStorage({
    destination: './uploads/nature-places',
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    cb(null, !!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/));
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

@Controller('nature-places')
export class NaturePlaceController {
  constructor(private readonly service: NaturePlaceService) {}

  @Post()
  @UseInterceptors(imageInterceptor)
  create(@UploadedFile() file: Express.Multer.File, @Body('dto') raw: string) {
    const dto: CreateNaturePlaceDto = raw ? JSON.parse(raw) : {};
    if (file) dto.imageUrl = `/uploads/nature-places/${file.filename}`;
    return this.service.create(dto);
  }

  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 50,
    @Query('category') category?: string,
    @Query('season') season?: string,
  ) {
    return this.service.findAll(+page, +limit, category, season);
  }

  // مکان‌های طبیعی فعال — برای سایت عمومی
  @Get('active')
  findActive(
    @Query('category') category?: string,
    @Query('season') season?: string,
  ) {
    return this.service.findActive(category, season);
  }

  // ایمپورت داده‌های اولیه
  @Post('seed')
  seed() {
    return this.service.seed();
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
    const dto: UpdateNaturePlaceDto = raw ? JSON.parse(raw) : {};
    if (file) dto.imageUrl = `/uploads/nature-places/${file.filename}`;
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
