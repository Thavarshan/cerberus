import { User } from '@/users/entities/user.entity';

export interface Role {
    readonly id: number;
    name: string;
    description?: string;
    slug: string;
    users?: Partial<User>[];
}
