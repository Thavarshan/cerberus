import { User } from '../users/user.entity';
export interface RefreshSession {
    id: number;
    user: Partial<User>;
    refreshToken: string;
    expiresIn: number | string;
    createdAt: number;
}
//# sourceMappingURL=refresh-session.entity.d.ts.map