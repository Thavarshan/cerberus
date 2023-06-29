import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';
import { User as UserInterface } from '@/interfaces/users/user.entity';
import { Roles } from '../enums/roles.enum';

@Entity({ name: 'users' })
export class User implements UserInterface {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Index()
    @Column({ name: 'username', type: 'varchar', nullable: false, unique: true })
    username: string;

    @Index({ unique: true })
    @Column({ type: 'varchar', nullable: false, unique: true })
    email: string;

    @Column({ type: 'varchar', nullable: false, unique: true })
    password: string;

    @Column({ type: 'varchar', nullable: true })
    phone?: string;

    @Column({ type: 'varchar', nullable: false, default: Roles.USER })
    role?: Roles;

    @Column({ type: 'boolean', nullable: true, default: false })
    verified: boolean;

    @Column({ type: 'int', nullable: true, default: 0 })
    loginAttempts?: number;

    @Column({ type: 'datetime', nullable: true, default: null })
    blockedAt?: Date;
}
