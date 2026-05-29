import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export const InvestmentCategory = {
  REAL_ESTATE: 'real-estate',
  AGRICULTURE: 'agriculture',
  TOURISM: 'tourism',
  HANDICRAFTS: 'handicrafts',
  INDUSTRY: 'industry',
  TECHNOLOGY: 'technology',
};

export const RiskLevel = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
};

export const InvestmentStatus = {
  ACTIVE: 'active',
  PENDING: 'pending',
  COMPLETED: 'completed',
};

@Entity('investments')
export class Investment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Multilingual title
  @Column({ type: 'json', nullable: false })
  title: { [lang: string]: string };

  // Multilingual short description (for cards)
  @Column({ type: 'json', nullable: false })
  shortDescription: { [lang: string]: string };

  // Multilingual full description
  @Column({ type: 'json', nullable: false })
  fullDescription: { [lang: string]: string };

  // Image URL
  @Column({ type: 'varchar', nullable: true })
  image: string;

  // Investment category
  @Column({
    type: 'varchar',
    enum: InvestmentCategory,
    default: InvestmentCategory.REAL_ESTATE,
  })
  category: string;

  // Icon name (e.g., 'building2' from Lucide React)
  @Column({ type: 'varchar', nullable: true })
  icon: string;

  // Investment information
  @Column({ type: 'varchar', nullable: true })
  minInvestment: string;

  @Column({ type: 'varchar', nullable: true })
  maxInvestment: string;

  @Column({ type: 'varchar', nullable: true })
  expectedReturn: string;

  @Column({ type: 'varchar', nullable: true })
  timeframe: string;

  @Column({
    type: 'varchar',
    enum: RiskLevel,
    nullable: true,
    default: RiskLevel.MEDIUM,
  })
  riskLevel: string;

  // Multilingual features/benefits
  @Column({ type: 'json', nullable: true })
  features: { [lang: string]: string[] };

  // Multilingual requirements
  @Column({ type: 'json', nullable: true })
  requirements: { [lang: string]: string[] };

  // Multilingual benefits
  @Column({ type: 'json', nullable: true })
  benefits: { [lang: string]: string[] };

  // Contact information
  @Column({ type: 'json', nullable: true })
  contactInfo: { [lang: string]: string };

  @Column({ type: 'varchar', nullable: true })
  supportPhone: string;

  // Status
  @Column({
    type: 'varchar',
    enum: InvestmentStatus,
    default: InvestmentStatus.ACTIVE,
  })
  status: string;

  // Views counter
  @Column({ type: 'int', default: 0 })
  views: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}