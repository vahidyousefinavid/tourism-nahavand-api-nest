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
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { InvestmentService } from './investment.service';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';

const uploadInterceptor = AnyFilesInterceptor({
  storage: diskStorage({
    destination: './uploads/investments',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
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
});

@Controller('investments')
export class InvestmentController {
  constructor(private readonly investmentService: InvestmentService) {}

  @Post()
  @UseInterceptors(uploadInterceptor)
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('dto') dtoStr: string,
    @Body() body: any,
  ) {
    let dto: CreateInvestmentDto;
    try {
      dto = dtoStr ? JSON.parse(dtoStr) : body;
    } catch {
      dto = body;
    }

    const newPaths = (files || []).map((f) => `/uploads/investments/${f.filename}`);
    dto.images = newPaths;

    return this.investmentService.create(dto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.investmentService.findAll(+page, +limit);
  }

  @Get('top/views')
  getTopByViews(@Query('limit') limit: number = 7) {
    return this.investmentService.getTopByViews(limit);
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

  @Post(':id/view')
  incrementView(@Param('id') id: string) {
    return this.investmentService.incrementView(id);
  }

  @Put(':id')
  @UseInterceptors(uploadInterceptor)
  async update(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body('dto') dtoStr: string,
    @Body() body: any,
  ) {
    let dto: UpdateInvestmentDto;
    try {
      dto = dtoStr ? JSON.parse(dtoStr) : body;
    } catch {
      dto = body;
    }

    // Append newly uploaded files to the existing images kept by the panel
    const newPaths = (files || []).map((f) => `/uploads/investments/${f.filename}`);
    if (newPaths.length) {
      dto.images = [...(dto.images || []), ...newPaths];
    }

    return this.investmentService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.investmentService.remove(id);
  }
}
