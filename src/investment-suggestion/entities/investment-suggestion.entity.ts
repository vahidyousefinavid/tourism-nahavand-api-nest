import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export type SuggestionStatus = 'pending' | 'reviewed' | 'approved' | 'rejected';

@Entity('investment_suggestions')
export class InvestmentSuggestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // اطلاعات پیشنهاددهنده
  @Column({ type: 'varchar' })
  fullName: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'varchar', nullable: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  nationalCode: string;

  // اطلاعات پیشنهاد
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  investmentArea: string; // ناحیه/منطقه پیشنهادی

  @Column({ type: 'varchar', nullable: true })
  category: string; // real-estate | agriculture | tourism | handicrafts | industry | technology

  @Column({ type: 'json', nullable: true })
  estimatedAmount: { amount: number; currency: string } | null;

  @Column({ type: 'varchar', nullable: true })
  expectedReturn: string;

  @Column({ type: 'varchar', nullable: true })
  timeframe: string;

  @Column({ type: 'text', nullable: true })
  additionalNotes: string;

  // مختصات جغرافیایی (اختیاری)
  @Column({ type: 'json', nullable: true })
  latlng: { lat: number; lng: number } | null;

  // وضعیت بررسی
  @Column({ type: 'varchar', default: 'pending' })
  status: SuggestionStatus;

  @Column({ type: 'text', nullable: true })
  adminNotes: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
