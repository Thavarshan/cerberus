import { authConfig } from '@/config/auth.config';
import { User } from '@/interfaces/users/user.entity';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

export class AccessToken {
    /**
     * Create new AccessToken instance.
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
     * Genaret a new access token.
     *
     * @returns {Promise<string>}
     */
    public async generate (): Promise<string> {
        return await this.jwt.signAsync(
            {
                sub: this.user.id,
                username: this.user.email,
            },
            {
                secret: this.config.secretKey,
                expiresIn: '24h',
            },
        );
    }
}
