import { RefreshSession } from '@/auth/entities/refresh-session.entity';
import { User } from '@/users/entities/user.entity';
import { Role } from '@/users/entities/role.entity';

export const entities = [
    User,
    RefreshSession,
    Role
];
