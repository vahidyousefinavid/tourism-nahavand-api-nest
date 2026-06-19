import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreativeCityParticipation } from './entities/creative-city-participation.entity';
import { CreateCreativeCityParticipationDto } from './dto/create-creative-city-participation.dto';
import { UpdateParticipationStatusDto } from './dto/update-status.dto';

@Injectable()
export class CreativeCityParticipationService {
  constructor(
    @InjectRepository(CreativeCityParticipation)
    private readonly repo: Repository<CreativeCityParticipation>,
  ) {}

  create(dto: CreateCreativeCityParticipationDto) {
    const item = this.repo.create(dto);
    return this.repo.save(item);
  }

  async findAll(page = 1, limit = 20, status?: string) {
    const qb = this.repo.createQueryBuilder('p').orderBy('p.createdAt', 'DESC');
    if (status) qb.where('p.status = :status', { status });
    const total = await qb.getCount();
    const data = await qb.skip((page - 1) * limit).take(limit).getMany();
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('درخواست یافت نشد');
    return item;
  }

  async updateStatus(id: string, dto: UpdateParticipationStatusDto) {
    const item = await this.findOne(id);
    item.status = dto.status;
    if (dto.adminNotes !== undefined) item.adminNotes = dto.adminNotes;
    return this.repo.save(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);
    return this.repo.remove(item);
  }

  async countByStatus() {
    return this.repo
      .createQueryBuilder('p')
      .select('p.status', 'status')
      .addSelect('COUNT(p.id)', 'count')
      .groupBy('p.status')
      .getRawMany();
  }
}
