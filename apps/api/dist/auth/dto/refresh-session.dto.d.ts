import { User } from '@/users/entities/user.entity';
export declare class RefreshSessionDto {
    readonly user: Partial<User>;
    readonly refreshToken: string;
    readonly expiresIn: number | string;
    readonly createdAt: number;
}
//# sourceMappingURL=refresh-session.dto.d.ts.map