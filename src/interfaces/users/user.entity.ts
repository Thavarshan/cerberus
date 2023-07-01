import { Roles } from '@/users/enums/roles.enum';

export interface User {
    id: number | string;
    name: string;
    username: string;
    email: string;
    password: string;
    phone?: string;
    role?: Roles;
    verified: boolean;
    loginAttempts?: number;
    blockedAt?: Date;
}
