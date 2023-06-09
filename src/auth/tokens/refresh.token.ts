import { authConfig } from '@/config/auth.config';
import { Token } from '@/interfaces/auth/token';
import { User } from '@/interfaces/users/user.entity';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

export class RefreshToken implements Token {
    /**
     * Create new RefreshToken instance.
     *
     * @param {ConfigType<authConfig>} config
     * @param {JwtService} jwt
     * @param {User} user
     *
     * @returns {void}
     */
    constructor (
        protected readonly config: ConfigType<typeof authConfig>,
        protected readonly jwt: JwtService,
        protected readonly user: User
    ) { }

    /**
     * Genaret a new refresh token.
     *
     * @returns {Promise<string>}
     */
    public async generate (): Promise<string> {
        return await this.jwt.signAsync(
            {
                sub: this.user.id,
                username: this.user.email
            },
            {
                expiresIn: '30d',
            },
        );
    }
}
