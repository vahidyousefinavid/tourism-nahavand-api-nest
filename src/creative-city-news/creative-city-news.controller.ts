import {
  Controller, Get, Post, Put, Delete, Patch,
  Body, Param, Query, UploadedFile, UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreativeCityNewsService } from './creative-city-news.service';
import { CreateCreativeCityNewsDto } from './dto/create-creative-city-news.dto';
import { UpdateCreativeCityNewsDto } from './dto/update-creative-city-news.dto';

const imageInterceptor = FileInterceptor('image', {
  storage: diskStorage({
    destination: './uploads/creative-city-news',
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    cb(null, !!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/));
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

@Controller('creative-city-news')
export class CreativeCityNewsController {
  constructor(private readonly service: CreativeCityNewsService) {}

  @Post()
  @UseInterceptors(imageInterceptor)
  create(@UploadedFile() file: Express.Multer.File, @Body('dto') raw: string) {
    const dto: CreateCreativeCityNewsDto = raw ? JSON.parse(raw) : {};
    if (file) dto.imageUrl = `/uploads/creative-city-news/${file.filename}`;
    return this.service.create(dto);
  }

  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 20,
    @Query('status') status?: string,
  ) {
    return this.service.findAll(+page, +limit, status);
  }

  // اخبار منتشرشده — برای سایت عمومی
  @Get('published')
  findPublished(@Query('limit') limit = 100) {
    return this.service.findPublished(+limit);
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
    const dto: UpdateCreativeCityNewsDto = raw ? JSON.parse(raw) : {};
    if (file) dto.imageUrl = `/uploads/creative-city-news/${file.filename}`;
    return this.service.update(id, dto);
  }

  @Patch(':id/publish')
  publish(@Param('id') id: string) {
    return this.service.publish(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
