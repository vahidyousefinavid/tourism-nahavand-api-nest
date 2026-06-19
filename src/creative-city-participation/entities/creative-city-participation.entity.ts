import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export type ParticipationStatus = 'pending' | 'reviewed' | 'approved' | 'rejected';

@Entity('creative_city_participations')
export class CreativeCityParticipation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'varchar', nullable: true })
  ageGroup: string;

  @Column({ type: 'varchar' })
  domain: string; // handicrafts | music | gastronomy | tech | education | literature | architecture | visualArts

  @Column({ type: 'varchar' })
  ideaTitle: string;

  @Column({ type: 'text' })
  ideaDesc: string;

  @Column({ type: 'simple-array', nullable: true })
  participation: string[]; // volunteer | teach | showcase | collaborate

  @Column({ type: 'varchar', default: 'pending' })
  status: ParticipationStatus;

  @Column({ type: 'text', nullable: true })
  adminNotes: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
