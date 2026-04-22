import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Like } from 'typeorm';
import { InvestmentOpportunity } from './entities/InvestmentOpportunity.entity';
import { CreateInvestmentOpportunityDto } from './dto/create-investment.dto';
import { UpdateInvestmentOpportunityDto } from './dto/update-investment.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class InvestmentOpportunityService {
  constructor(
    @InjectRepository(InvestmentOpportunity)
    private repo: Repository<InvestmentOpportunity>,
  ) {}

  async create(dto: CreateInvestmentOpportunityDto) {
    const created = this.repo.create(dto);
    return this.repo.save(created);
  }

  // Pagination + Filters
  async findAll(query: any) {
    const page = +query.page || 1;
    const limit = +query.limit || 10;

    const where: any = {};

    if (query.city)
      where['location'] = { city: Like(`%${query.city}%`) };

    if (query.minInvestment && query.maxInvestment)
      where.requiredInvestment = Between(query.minInvestment, query.maxInvestment);

    const [data, total] = await this.repo.findAndCount({
      where,
      take: limit,
      skip: (page - 1) * limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data,
      meta: {
        page,
        limit,
        total,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const item = await this.repo.findOne({ where: { id } });

    if (!item) throw new NotFoundException('Opportunity not found');

    item.views++;
    await this.repo.save(item);

    return item;
  }

  async update(id: string, dto: UpdateInvestmentOpportunityDto) {
    const inv = await this.findOne(id);

    Object.assign(inv, dto);
    return this.repo.save(inv);
  }

  async remove(id: string) {
    const item = await this.findOne(id);

    if (item.images) {
      item.images.forEach((img) => {
        const filePath = path.join(process.cwd(), img);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      });
    }
    if (item.attachments) {
      item.attachments.forEach((file) => {
        const filePath = path.join(process.cwd(), file);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      });
    }

    return this.repo.remove(item);
  }

  // بهترین فرصت‌ها (براساس امتیاز یا بازدید)
  async getTop() {
    return this.repo.find({
      take: 5,
      order: { views: 'DESC' },
    });
  }
}
