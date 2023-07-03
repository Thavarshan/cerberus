import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    Index
} from 'typeorm';
import { RefreshSession as RefreshSessionInterface } from '@/interfaces/auth/refresh-session.entity';
import { User } from '@/users/entities/user.entity';

@Entity({ name: 'refresh_sessions' })
export class RefreshSession implements RefreshSessionInterface {
    @PrimaryGeneratedColumn()
    public readonly id: number;

    @ManyToOne(() => User, user => user.sessions)
    public user: Partial<User>;

    @Index('idx_refresh_token')
    @Column({ name: 'refresh_token', type: 'varchar', nullable: false, unique: true })
    public refreshToken: string;

    @Column({ type: 'varchar', nullable: false })
    public expiresIn: number | string;

    @Column({ type: 'int', nullable: false })
    public createdAt: number;
}
