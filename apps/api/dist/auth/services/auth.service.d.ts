import { JwtService } from '@nestjs/jwt';
import { Credentials } from '@/interfaces/auth/credentials.interface';
import { UsersService } from '@/users/services/users.service';
import { AuthService as AuthServiceInterface } from '@/interfaces/auth/auth.service';
import { User as UserInterface } from '@/interfaces/users/user.entity';
import { User } from '@/users/entities/user.entity';
import { ConfigType } from '@nestjs/config';
import { authConfig } from '@/config/auth.config';
import { RefreshSessionService } from './refresh-session.service';
import { RefreshSession } from '../entities/refresh-session.entity';
import { AuthResponse } from '@/interfaces/auth/auth-response';
export declare class AuthService implements AuthServiceInterface {
    protected readonly config: ConfigType<typeof authConfig>;
    protected readonly users: UsersService;
    protected readonly refreshSession: RefreshSessionService;
    protected jwt: JwtService;
    constructor(config: ConfigType<typeof authConfig>, users: UsersService, refreshSession: RefreshSessionService, jwt: JwtService);
    authenticate(credentials: Credentials): Promise<AuthResponse>;
    refreshToken(token: string): Promise<any>;
    generateAccessToken(user: UserInterface): Promise<string>;
    generateRefreshToken(user: UserInterface): Promise<string>;
    createRefreshSession(user: User, refreshToken: string): Promise<void>;
    protected updateRefreshSession(session: RefreshSession, refreshToken: string): Promise<void>;
}
//# sourceMappingURL=auth.service.d.ts.map