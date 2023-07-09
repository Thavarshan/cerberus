import { User as UserInterface } from '@/interfaces/users/user.entity';
import { RefreshSession } from '@/auth/entities/refresh-session.entity';
import { Role } from './role.entity';
export declare class User implements UserInterface {
    readonly id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    phone?: string;
    role?: Partial<Role>;
    verified: boolean;
    loginAttempts?: number;
    blockedAt?: Date;
    sessions?: Partial<RefreshSession>[];
    static filterKeys: string[];
}
//# sourceMappingURL=user.entity.d.ts.map