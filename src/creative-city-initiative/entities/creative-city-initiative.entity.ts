import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export type InitiativeStatus = 'active' | 'ongoing' | 'planned' | 'completed';
export interface MultiLang { fa: string; en?: string; ar?: string; zh?: string }

@Entity('creative_city_initiatives')
export class CreativeCityInitiative {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'json' })
  title: MultiLang;

  @Column({ type: 'json', nullable: true })
  description: MultiLang;

  @Column({ type: 'varchar' })
  sector: string;

  @Column({ type: 'varchar', default: 'active' })
  status: InitiativeStatus;

  @Column({ type: 'int', default: 0 })
  activityLevel: number;

  @Column({ type: 'int', default: 0 })
  participantsCount: number;

  @Column({ type: 'varchar', nullable: true })
  startYear: string;

  @Column({ type: 'varchar', nullable: true })
  imageUrl: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
