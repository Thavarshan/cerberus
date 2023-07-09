import { AuthService } from '@/auth/services/auth.service';
import { User as UserInterface } from '@/interfaces/users/user.entity';
import { Credentials } from '../dto/credentials.dto';
import { AuthResponse } from '@/interfaces/auth/auth-response';
export declare class AuthController {
    protected readonly service: AuthService;
    constructor(service: AuthService);
    login(dto: Credentials): Promise<AuthResponse>;
    user(user: UserInterface): Promise<UserInterface>;
    refreshTokens(refreshToken: string): Promise<any>;
}
//# sourceMappingURL=auth.controller.d.ts.map