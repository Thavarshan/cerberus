import { RefreshSession as RefreshSessionInterface } from '@/interfaces/auth/refresh-session.entity';
import { User } from '@/users/entities/user.entity';
export declare class RefreshSession implements RefreshSessionInterface {
    readonly id: number;
    user: Partial<User>;
    refreshToken: string;
    expiresIn: number | string;
    createdAt: number;
}
//# sourceMappingURL=refresh-session.entity.d.ts.map