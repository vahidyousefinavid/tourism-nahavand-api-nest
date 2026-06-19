import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export interface MultiLang { fa: string; en?: string; ar?: string; zh?: string }

export type NatureCategory = 'waterfall' | 'river' | 'mountain' | 'forest' | 'valley' | 'lake' | 'plain' | 'spring';
export type NatureSeason   = 'spring' | 'summer' | 'autumn' | 'winter' | 'all';
export type NatureDifficulty = 'easy' | 'medium' | 'hard';

@Entity('nature_places')
export class NaturePlace {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'json' })
  name: MultiLang;

  @Column({ type: 'varchar' })
  category: NatureCategory;

  @Column({ type: 'float' })
  lat: number;

  @Column({ type: 'float' })
  lng: number;

  @Column({ type: 'varchar', default: 'all' })
  bestSeason: NatureSeason;

  @Column({ type: 'float', default: 0 })
  distanceKm: number;

  @Column({ type: 'int', default: 0 })
  elevationM: number;

  @Column({ type: 'json', nullable: true })
  desc: MultiLang;

  @Column({ type: 'varchar', default: 'easy' })
  difficulty: NatureDifficulty;

  @Column({ type: 'int', default: 0 })
  trailOrder: number;

  @Column({ type: 'varchar', nullable: true })
  imageUrl: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
