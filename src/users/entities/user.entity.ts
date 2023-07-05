import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Index,
    OneToMany,
    OneToOne,
    JoinColumn
} from 'typeorm';
import { User as UserInterface } from '@/interfaces/users/user.entity';
import { RefreshSession } from '@/auth/entities/refresh-session.entity';
import { Role } from './role.entity';

@Entity({ name: 'users' })
export class User implements UserInterface {
    @PrimaryGeneratedColumn('uuid')
    public readonly id: string;

    @Index('idx_name')
    @Column({ name: 'name', type: 'varchar', nullable: false })
    public name: string;

    @Index('idx_username')
    @Column({ name: 'username', type: 'varchar', nullable: false, unique: true })
    public username: string;

    @Index('idx_email')
    @Column({ name: 'email', type: 'varchar', nullable: false, unique: true })
    public email: string;

    @Column({ type: 'varchar', nullable: false, unique: true })
    public password: string;

    @Column({ type: 'varchar', nullable: true })
    public phone?: string;

    @Column({ type: 'int', nullable: false })
    @OneToOne(() => Role, role => role.users, { onDelete: 'SET NULL' })
    @JoinColumn()
    public role?: Partial<Role>;

    @Column({ type: 'boolean', nullable: true, default: false })
    public verified: boolean;

    @Column({ type: 'int', nullable: true, default: 0 })
    public loginAttempts?: number;

    @Column({ type: 'datetime', nullable: true, default: null })
    public blockedAt?: Date;

    @OneToMany(() => RefreshSession, refreshSession => refreshSession.user)
    public sessions?: Partial<RefreshSession>[];

    /**
     * The list of keys that can be used to filter the query.
     *
     * @var {string[]}
     */
    public static filterKeys = [
        'username',
        'email',
    ];
}
