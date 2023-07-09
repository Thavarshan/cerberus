import { Role } from '@/users/entities/role.entity';
import { RefreshSession } from '../auth/refresh-session.entity';
export interface User {
    id: string;
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
}
//# sourceMappingURL=user.entity.d.ts.map