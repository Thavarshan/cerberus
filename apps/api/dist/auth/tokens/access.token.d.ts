import { authConfig } from '@/config/auth.config';
import { Token } from '@/interfaces/auth/token';
import { User } from '@/interfaces/users/user.entity';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
export declare class AccessToken implements Token {
    protected readonly config: ConfigType<typeof authConfig>;
    protected readonly jwt: JwtService;
    protected readonly user: User;
    constructor(config: ConfigType<typeof authConfig>, jwt: JwtService, user: User);
    generate(): Promise<string>;
}
//# sourceMappingURL=access.token.d.ts.map