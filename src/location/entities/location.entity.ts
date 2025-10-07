import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Location {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // چندزبانه پویا
    @Column({ type: 'json' })
    name: Record<string, string>; // { fa: '...', en: '...', ... }

    @Column({ type: 'json' })
    description: Record<string, string>;

    @Column({ type: 'enum', enum: ['historical', 'natural', 'cultural', 'religious'] })
    category: 'historical' | 'natural' | 'cultural' | 'religious';

    @Column({ type: 'simple-array', nullable: false })
    images: string[];

    @Column({ type: 'int', default: 0 })
    mainImageIndex: number;

    @Column({ type: 'json', nullable: true })
    latlng: { lat: number; lng: number };

    // امکانات چندزبانه پویا
    @Column({ type: 'json', nullable: true })
    facilities?: Record<string, string[]>; // { fa: ['وای‌فای'], en: ['Wi-Fi'] }

    @Column({ type: 'json' })
    openingHours: Record<string, string>;

    @Column({ type: 'json' })
    entryFee: Record<string, string>;

    @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
    rating: number;

    @Column({ type: 'int', default: 0 })
    views: number;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date;
}
