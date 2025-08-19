import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
@Index(['firstName', 'lastName', 'dateOfBirth'], { unique: true })
export class Customer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ type: 'date' })
    dateOfBirth: Date;

    // 'unsigned big int' is not supported in TypeORM, 
    // so only 'bigint' is used here.
    // However, storing phone numbers as strings (varchar) is generally more appropriate 
    // because it preserves leading zeros and special characters.
    // But according to the current requirement, 'bigint' is used.
    @Column({ type: 'bigint', nullable: false })
    phoneNumber: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    bankAccountNumber: string;
}
