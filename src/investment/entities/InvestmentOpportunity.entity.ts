import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('investment_opportunities')
export class InvestmentOpportunity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // متن چندزبانه
  @Column({ type: 'json' })
  title: Record<string, string>;

  @Column({ type: 'json' })
  description: Record<string, string>;

  // دسته‌بندی
  @Column({ type: 'json' })
  category: Record<string, string>;

  // موقعیت
  @Column({ type: 'json' })
  location: {
    address: Record<string, string>;
    city: Record<string, string>;
    province: Record<string, string>;
    lat?: number;
    lng?: number;
  };

  // مالی
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  requiredInvestment: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  raisedInvestment: number;

  @Column({ type: 'json' })
  roi: Record<string, string>;

  @Column({ type: 'json' })
  returnPeriod: Record<string, string>;

  @Column({ type: 'json' })
  status: Record<string, string>;

  // حقوقی
  @Column({ type: 'json' })
  legalInfo: {
    ownerName: Record<string, string>;
    permits: Record<string, string[]>;
    registrationNumber?: string;
  };

  // ملک
  @Column({ type: 'json', nullable: true })
  landInfo?: {
    type: Record<string, string>;
    documentStatus: Record<string, string>;
    area: number;
  };

  // متن چندزبانه
  @Column({ type: 'json', nullable: true })
  benefits?: Record<string, string[]>;

  @Column({ type: 'json', nullable: true })
  risks?: Record<string, string[]>;

  @Column({ type: 'json', nullable: true })
  technicalInfo?: Record<string, string[]>;

  // فایل‌ها
  @Column({ type: 'simple-array', nullable: true })
  images: string[];

  @Column({ type: 'simple-array', nullable: true })
  attachments: string[];

  @Column({ type: 'int', default: 0 })
  views: number;

  @Column({ type: 'int', default: 0 })
  priorityScore: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
