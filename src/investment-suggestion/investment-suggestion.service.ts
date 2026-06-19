import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvestmentSuggestion } from './entities/investment-suggestion.entity';
import { CreateInvestmentSuggestionDto } from './dto/create-investment-suggestion.dto';
import { UpdateSuggestionStatusDto } from './dto/update-suggestion-status.dto';

@Injectable()
export class InvestmentSuggestionService {
  constructor(
    @InjectRepository(InvestmentSuggestion)
    private readonly repo: Repository<InvestmentSuggestion>,
  ) {}

  create(dto: CreateInvestmentSuggestionDto) {
    const suggestion = this.repo.create(dto);
    return this.repo.save(suggestion);
  }

  async findAll(page = 1, limit = 20, status?: string) {
    const qb = this.repo.createQueryBuilder('s').orderBy('s.createdAt', 'DESC');
    if (status) qb.where('s.status = :status', { status });
    const total = await qb.getCount();
    const data = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('پیشنهاد یافت نشد');
    return item;
  }

  async updateStatus(id: string, dto: UpdateSuggestionStatusDto) {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.repo.save(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);
    return this.repo.remove(item);
  }

  countByStatus() {
    return this.repo
      .createQueryBuilder('s')
      .select('s.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('s.status')
      .getRawMany();
  }
}
