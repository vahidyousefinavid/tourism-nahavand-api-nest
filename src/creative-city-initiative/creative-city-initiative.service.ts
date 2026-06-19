import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreativeCityInitiative, InitiativeStatus } from './entities/creative-city-initiative.entity';
import { CreateCreativeCityInitiativeDto } from './dto/create-creative-city-initiative.dto';
import { UpdateCreativeCityInitiativeDto } from './dto/update-creative-city-initiative.dto';

@Injectable()
export class CreativeCityInitiativeService {
  constructor(
    @InjectRepository(CreativeCityInitiative)
    private readonly repo: Repository<CreativeCityInitiative>,
  ) {}

  create(dto: CreateCreativeCityInitiativeDto) {
    const item = this.repo.create({
      ...dto,
      status: (dto.status as InitiativeStatus) ?? 'active',
    });
    return this.repo.save(item);
  }

  async findAll(page = 1, limit = 50, sector?: string, status?: string) {
    const qb = this.repo.createQueryBuilder('i').orderBy('i.createdAt', 'DESC');
    if (sector) qb.andWhere('i.sector = :sector', { sector });
    if (status) qb.andWhere('i.status = :status', { status });
    const total = await qb.getCount();
    const data = await qb.skip((page - 1) * limit).take(limit).getMany();
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  // برای سایت عمومی: فقط active + ongoing
  findActive(sector?: string) {
    const qb = this.repo.createQueryBuilder('i')
      .where('i.status IN (:...statuses)', { statuses: ['active', 'ongoing', 'planned'] })
      .orderBy('i.status', 'ASC')
      .addOrderBy('i.activityLevel', 'DESC');
    if (sector) qb.andWhere('i.sector = :sector', { sector });
    return qb.getMany();
  }

  async findOne(id: string) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('طرح یافت نشد');
    return item;
  }

  async update(id: string, dto: UpdateCreativeCityInitiativeDto) {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.repo.save(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);
    return this.repo.remove(item);
  }
}
