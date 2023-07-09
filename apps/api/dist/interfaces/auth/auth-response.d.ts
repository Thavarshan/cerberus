import { User } from '../users/user.entity';
export interface AuthResponse extends User {
    accessToken: string;
    refreshToken: string;
}
//# sourceMappingURL=auth-response.d.ts.map