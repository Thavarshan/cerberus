import { Roles } from '@/users/enums/roles.enum';
import { RefreshSession } from '../auth/refresh-session.entity';

export interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    phone?: string;
    role?: Roles;
    verified: boolean;
    loginAttempts?: number;
    blockedAt?: Date;
    sessions?: Partial<RefreshSession>[];
}
