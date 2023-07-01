import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Credentials } from '@/interfaces/auth/credentials.interface';
import { UsersService } from '@/users/services/users.service';
import { AccessToken } from '@/interfaces/auth/access.token';
import { AuthService as AuthServiceInterface } from '@/interfaces/auth/auth.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService implements AuthServiceInterface {
    /**
     * Create new AuthService instance.
     *
     * @param {UsersService} users
     * @param {JwtService} jwt
     *
     * @returns {void}
     */
    constructor (
        protected users: UsersService,
        protected jwt: JwtService
    ) { }

    /**
     * Authenticate user with the given credentials.
     *
     * @param {Credentials} credentials
     *
     * @returns {Promise<{ [key: string]: any; }>}
     */
    public async authenticate (
        credentials: Credentials
    ): Promise<AccessToken> {
        const user = await this.users.findByEmail(credentials.email);

        compare(credentials.password, user.password, (error, result) => {
            if (error) {
                throw new UnauthorizedException(error.message);
            }

            return result;
        });

        const accessToken = await this.jwt.signAsync({
            username: user.email,
            sub: user.id
        });

        return { accessToken, ...user };
    }
}
