import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class Location {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ type: 'date' })
    date: Date;

    @Column({ type: 'bigint', nullable: false })
    location: string;

    @Column({
        unique: true
    })
    latlang: string;

    @Column()
    price: string;

    @Column()
    capacity: string;

    @Column()
    registered: string;

    @Column()
    organizer: string
}
