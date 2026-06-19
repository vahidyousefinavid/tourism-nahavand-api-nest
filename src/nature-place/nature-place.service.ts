import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NaturePlace } from './entities/nature-place.entity';
import { CreateNaturePlaceDto } from './dto/create-nature-place.dto';
import { UpdateNaturePlaceDto } from './dto/update-nature-place.dto';
const SEED_DATA: CreateNaturePlaceDto[] = [
  {
    name: {
      fa: 'آبشار ریجاب',
      en: 'Rijab Waterfall',
      ar: 'شلال ريجاب',
      zh: '里贾布瀑布'
    },
    category: 'waterfall',
    lat: 34.083,
    lng: 48.290,
    bestSeason: 'spring',
    distanceKm: 22,
    elevationM: 1850,
    desc: {
      fa: 'آبشاری زیبا در دل کوه‌های زاگرس با ارتفاع ۱۸ متر، یکی از جاذبه‌های طبیعی بی‌نظیر نهاوند.',
      en: 'A beautiful 18-meter waterfall in the heart of the Zagros mountains, one of Nahavand\'s unique natural attractions.',
      ar: 'شلال جميل بارتفاع 18 متراً في قلب جبال زاغروس، ويُعد من أبرز المعالم الطبيعية في نهاوند.',
      zh: '位于扎格罗斯山脉中心的一处18米高美丽瀑布，是纳哈万德最独特的自然景点之一。'
    },
    difficulty: 'medium',
    trailOrder: 1
  },
  {
    name: {
      fa: 'دریاچه سد نهاوند',
      en: 'Nahavand Dam Lake',
      ar: 'بحيرة سد نهاوند',
      zh: '纳哈万德水库湖'
    },
    category: 'lake',
    lat: 34.140,
    lng: 48.400,
    bestSeason: 'all',
    distanceKm: 6,
    elevationM: 1680,
    desc: {
      fa: 'دریاچه‌ای آرام با آب فیروزه‌ای و کوه‌های اطراف، مکانی عالی برای پیک‌نیک و ماهیگیری.',
      en: 'A calm lake with turquoise water and surrounding mountains, perfect for picnics and fishing.',
      ar: 'بحيرة هادئة بمياه فيروزية وجبال تحيط بها، مثالية للنزهات وصيد الأسماك.',
      zh: '平静的湖泊，拥有碧绿色湖水和环绕群山，非常适合野餐和垂钓。'
    },
    difficulty: 'easy',
    trailOrder: 2
  },
  {
    name: {
      fa: 'رودخانه گاماسیاب',
      en: 'Gamasiab River',
      ar: 'نهر گاماسياب',
      zh: '加马西亚布河'
    },
    category: 'river',
    lat: 34.150,
    lng: 48.220,
    bestSeason: 'spring',
    distanceKm: 8,
    elevationM: 1740,
    desc: {
      fa: 'رودخانه‌ای پرآب که از دل کوه‌های نهاوند سرچشمه می‌گیرد و مناظر بکری را به نمایش می‌گذارد.',
      en: 'A powerful river originating from the mountains of Nahavand, showcasing pristine landscapes.',
      ar: 'نهر غزير ينبع من جبال نهاوند ويعرض مناظر طبيعية بكر رائعة.',
      zh: '发源于纳哈万德山区的一条水量充沛的河流，展现原始自然风光。'
    },
    difficulty: 'easy',
    trailOrder: 3
  },
  {
    name: {
      fa: 'تنگه واشی',
      en: 'Vashi Gorge',
      ar: 'مضيق واشي',
      zh: '瓦希峡谷'
    },
    category: 'valley',
    lat: 34.100,
    lng: 48.350,
    bestSeason: 'spring',
    distanceKm: 14,
    elevationM: 1750,
    desc: {
      fa: 'دره‌ای باریک با دیواره‌های سنگی عمودی و رودخانه‌ای کوچک — مسیر پیاده‌روی هیجان‌انگیز.',
      en: 'A narrow gorge with vertical rock walls and a small river — an exciting hiking trail.',
      ar: 'وادي ضيق بجدران صخرية عمودية ونهر صغير، يوفر مساراً ممتعاً للمشي.',
      zh: '狭窄峡谷，两侧为垂直岩壁并有小河穿过，是令人兴奋的徒步路线。'
    },
    difficulty: 'medium',
    trailOrder: 4
  },
  {
    name: {
      fa: 'چشمه علی‌خان',
      en: 'Ali Khan Spring',
      ar: 'نبع علي خان',
      zh: '阿里汗泉'
    },
    category: 'spring',
    lat: 34.220,
    lng: 48.280,
    bestSeason: 'all',
    distanceKm: 10,
    elevationM: 1820,
    desc: {
      fa: 'چشمه‌ای طبیعی با آب سرد و گوارا در میان باغ‌های کوهپایه‌ای، مکانی برای استراحت و آرامش.',
      en: 'A natural spring with cold, fresh water among hillside orchards, a place for rest and tranquility.',
      ar: 'نبع طبيعي بمياه باردة وعذبة وسط البساتين الجبلية، مكان مثالي للراحة والاسترخاء.',
      zh: '位于山麓果园中的天然泉水，水质清凉甘甜，是休憩放松的理想之地。'
    },
    difficulty: 'easy',
    trailOrder: 5
  }
];

@Injectable()
export class NaturePlaceService {
  constructor(
    @InjectRepository(NaturePlace)
    private readonly repo: Repository<NaturePlace>,
  ) { }

  create(dto: CreateNaturePlaceDto) {
    return this.repo.save(this.repo.create(dto as any));
  }

  async findAll(page = 1, limit = 50, category?: string, season?: string) {
    const qb = this.repo.createQueryBuilder('p').orderBy('p.trailOrder', 'ASC');
    if (category) qb.andWhere('p.category = :category', { category });
    if (season && season !== 'all') qb.andWhere('(p.bestSeason = :season OR p.bestSeason = :all)', { season, all: 'all' });
    const total = await qb.getCount();
    const data = await qb.skip((page - 1) * limit).take(limit).getMany();
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  // برای سایت عمومی: همه مکان‌های فعال
  findActive(category?: string, season?: string) {
    const qb = this.repo.createQueryBuilder('p')
      .where('p.isActive = :active', { active: true })
      .orderBy('p.trailOrder', 'ASC');
    if (category) qb.andWhere('p.category = :category', { category });
    if (season && season !== 'all') qb.andWhere('(p.bestSeason = :season OR p.bestSeason = :all)', { season, all: 'all' });
    return qb.getMany();
  }

  async findOne(id: string) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('مکان طبیعی یافت نشد');
    return item;
  }

  async update(id: string, dto: UpdateNaturePlaceDto) {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.repo.save(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);
    return this.repo.remove(item);
  }

  async seed() {
    const count = await this.repo.count();
    if (count > 0) return { message: 'داده‌ها قبلاً وارد شده‌اند', count };
    const items = this.repo.create(SEED_DATA as any[]);
    await this.repo.save(items);
    return { message: 'داده‌های اولیه با موفقیت وارد شد', count: items.length };
  }
}
