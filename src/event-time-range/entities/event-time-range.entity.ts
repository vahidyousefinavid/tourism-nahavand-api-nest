import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Event } from '../../event/entities/event.entity';

@Entity()
export class EventTimeRange {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Event, (event) => event.timeRanges, { onDelete: 'CASCADE' })
    event: Event;

    @Column({ type: 'varchar', length: 50 })
    mode: string; // continuous, daily, weekly, specificDates, multipleRanges

    @Column({ type: 'date', nullable: true })
    startDate: string;

    @Column({ type: 'date', nullable: true })
    endDate: string;

    @Column({ type: 'time', nullable: true })
    timeStart: string;

    @Column({ type: 'time', nullable: true })
    timeEnd: string;

    @Column({ type: 'varchar', nullable: true })
    daysOfWeek: string; // "1,3,5"

    @Column({ type: 'text', nullable: true })
    specificDates: string; // JSON string

    @Column({ type: 'text', nullable: true })
    exceptions: string; // JSON string

    @Column({ type: 'text', nullable: true })
    ranges: string; // JSON string
}
