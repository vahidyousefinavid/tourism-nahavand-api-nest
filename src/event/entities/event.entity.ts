import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { EventTimeRange } from '../../event-time-range/entities/event-time-range.entity';

@Entity()
export class Event {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'json', nullable: false })
    title: { [lang: string]: string }; 

    @Column({ type: 'json', nullable: false })
    description: { [lang: string]: string }; 

    @Column({ nullable: true })
    image: string;

    @Column({ type: 'json', nullable: false })
    location: { [lang: string]: string }; 

    @Column({ type: 'json', nullable: true })
    latlng: { lat: number; lng: number };

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    price: number;

    @Column({ type: 'int', default: 0 })
    capacity: number;

    @Column({ type: 'int', default: 0 })
    registered: number;
    
    @Column({ type: 'json', nullable: false })
    organizer: { [lang: string]: string }; 

    @OneToMany(() => EventTimeRange, (timeRange) => timeRange.event, {
        cascade: true,
    })
    timeRanges: EventTimeRange[];

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date;
}
