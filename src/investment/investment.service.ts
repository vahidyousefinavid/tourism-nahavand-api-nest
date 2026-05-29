import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Investment } from './entities/investment.entity';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';

@Injectable()
export class InvestmentService {
  constructor(
    @InjectRepository(Investment)
    private readonly investmentRepo: Repository<Investment>,
  ) {}

  async create(dto: CreateInvestmentDto) {
    const investment = this.investmentRepo.create(dto);
    return this.investmentRepo.save(investment);
  }

  async findAll(page = 1, limit = 10) {
    const [data, total] = await this.investmentRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async findAllByCategory(category?: string) {
    if (category) {
      return this.investmentRepo.find({
        where: { category },
        order: { createdAt: 'DESC' },
      });
    }
    return this.investmentRepo.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const investment = await this.investmentRepo.findOne({ where: { id } });
    if (!investment) throw new NotFoundException('Investment opportunity not found');

    investment.views++;
    await this.investmentRepo.save(investment);

    return investment;
  }

  async update(id: string, dto: UpdateInvestmentDto) {
    const investment = await this.findOne(id);
    Object.assign(investment, dto);
    return this.investmentRepo.save(investment);
  }

  async remove(id: string) {
    const investment = await this.findOne(id);
    return this.investmentRepo.remove(investment);
  }

  async getTopByViews(limit = 7) {
    return this.investmentRepo.find({
      order: { views: 'DESC' },
      take: limit,
    });
  }

  async findAllByStatus(status: string) {
    return this.investmentRepo.find({
      where: { status },
      order: { createdAt: 'DESC' },
    });
  }
}