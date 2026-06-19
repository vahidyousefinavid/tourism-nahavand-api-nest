import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export type NewsStatus = 'draft' | 'published';
export interface MultiLang { fa: string; en?: string; ar?: string; zh?: string }

@Entity('creative_city_news')
export class CreativeCityNews {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'json' })
  title: MultiLang;

  @Column({ type: 'json' })
  summary: MultiLang;

  @Column({ type: 'json', nullable: true })
  content: MultiLang;

  @Column({ type: 'varchar', nullable: true })
  imageUrl: string;

  @Column({ type: 'varchar', nullable: true })
  category: string;

  @Column({ type: 'varchar', default: 'draft' })
  status: NewsStatus;

  @Column({ type: 'timestamp with time zone', nullable: true })
  publishedAt: Date;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
