import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreativeCityNews } from './entities/creative-city-news.entity';
import { CreateCreativeCityNewsDto } from './dto/create-creative-city-news.dto';
import { UpdateCreativeCityNewsDto } from './dto/update-creative-city-news.dto';

@Injectable()
export class CreativeCityNewsService {
  constructor(
    @InjectRepository(CreativeCityNews)
    private readonly repo: Repository<CreativeCityNews>,
  ) {}

  create(dto: CreateCreativeCityNewsDto) {
    const item = this.repo.create(dto);
    if (dto.status === 'published') item.publishedAt = new Date();
    return this.repo.save(item);
  }

  async findAll(page = 1, limit = 20, status?: string) {
    const qb = this.repo.createQueryBuilder('n').orderBy('n.createdAt', 'DESC');
    if (status) qb.where('n.status = :status', { status });
    const total = await qb.getCount();
    const data = await qb.skip((page - 1) * limit).take(limit).getMany();
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  // فقط اخبار منتشرشده — برای سایت عمومی
  findPublished(limit = 10) {
    return this.repo.find({
      where: { status: 'published' },
      order: { publishedAt: 'DESC' },
      take: limit,
    });
  }

  async findOne(id: string) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('خبر یافت نشد');
    return item;
  }

  async update(id: string, dto: UpdateCreativeCityNewsDto) {
    const item = await this.findOne(id);
    // اگر وضعیت از draft به published تغییر کرد، تاریخ انتشار ثبت شود
    if (dto.status === 'published' && item.status === 'draft') {
      item.publishedAt = new Date();
    }
    Object.assign(item, dto);
    return this.repo.save(item);
  }

  async publish(id: string) {
    const item = await this.findOne(id);
    item.status = 'published';
    item.publishedAt = new Date();
    return this.repo.save(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);
    return this.repo.remove(item);
  }
}
