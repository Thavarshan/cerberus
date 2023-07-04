import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Credentials } from '@/interfaces/auth/credentials.interface';
import { UsersService } from '@/users/services/users.service';
import { AuthService as AuthServiceInterface } from '@/interfaces/auth/auth.service';
import { compare } from 'bcrypt';
import { User as UserInterface } from '@/interfaces/users/user.entity';
import { User } from '@/users/entities/user.entity';
import { ConfigType } from '@nestjs/config';
import { authConfig } from '@/config/auth.config';
import { AccessToken } from '../tokens/access.token';
import { RefreshToken } from '../tokens/refresh.token';
import { RefreshSessionService } from './refresh-session.service';
import { RefreshSession } from '../entities/refresh-session.entity';
import { UpdateRefreshSessionDto } from '../dto/update-refresh-session.dto';
import { CreateRefreshSessionDto } from '../dto/create-refresh-session.dto';
import { AuthResponse } from '@/interfaces/auth/auth-response';

@Injectable()
export class AuthService implements AuthServiceInterface {
    /**
     * Create new AuthService instance.
     *
     * @param {ConfigType<authConfig>} config
     * @param {UsersService} users
     * @param {RefreshSessionService} refreshSession
     * @param {JwtService} jwt
     *
     * @returns {void}
     */
    constructor (
        @Inject(authConfig.KEY)
        protected readonly config: ConfigType<typeof authConfig>,
        protected readonly users: UsersService,
        protected readonly refreshSession: RefreshSessionService,
        protected jwt: JwtService
    ) { }

    /**
     * Authenticate user with the given credentials.
     *
     * @param {Credentials} credentials
     *
     * @returns {Promise<AuthResponse>}
     */
    public async authenticate (
        credentials: Credentials
    ): Promise<AuthResponse> {
        const user = await this.users.findByEmail(credentials.email);

        compare(credentials.password, user.password, (error, result) => {
            if (error) {
                throw new UnauthorizedException(error.message);
            }

            return result;
        });

        const accessToken = await this.generateAccessToken(user);
        const refreshToken = await this.generateRefreshToken(user);

        await this.createRefreshSession(user, refreshToken);

        return { ...user, accessToken, refreshToken };
    }

    /**
     * Generate new refresh token for the authenticated user.
     *
     * @param {string} token
     *
     * @returns {Promise<any>}
     */
    public async refreshToken (token: string): Promise<any> {
        let decodedToken: any = undefined;

        try {
            decodedToken = this.jwt.verify(token);
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }

        const user: User = await this
            .users
            .findByEmail(decodedToken.username);

        const session: RefreshSession = await this
            .refreshSession
            .findByRefreshToken(token);

        if (!session) {
            throw new UnauthorizedException('Refresh token not found');
        }

        const accessToken = await this.generateAccessToken(user);
        const refreshToken = await this.generateRefreshToken(user);

        await this.updateRefreshSession(session, refreshToken);

        return { ...user, accessToken, refreshToken };
    }

    /**
     * Generate new access token for the authenticated user.
     *
     * @param {UserInterface} user
     *
     * @returns {Promise<string>}
     */
    public async generateAccessToken (user: UserInterface): Promise<string> {
        const accessToken = new AccessToken(this.config, this.jwt, user);

        return await accessToken.generate();
    }

    /**
     * Generate new refresh token for the authenticated user.
     *
     * @param {UserInterface} user
     *
     * @returns {Promise<string>}
     */
    public async generateRefreshToken (user: UserInterface): Promise<string> {
        const refreshToken = new RefreshToken(this.config, this.jwt, user);

        return await refreshToken.generate();
    }

    /**
     * Create new refresh session for the authenticated user.
     *
     * @param {User} user
     * @param {string} refreshToken
     *
     * @returns {Promise<void>}
     */
    public async createRefreshSession (
        user: User,
        refreshToken: string
    ): Promise<void> {
        const decodedRefreshToken: any = this.jwt.decode(refreshToken);

        await this.refreshSession.create({
            user: user.id as Partial<User>,
            refreshToken: refreshToken,
            expiresIn: decodedRefreshToken.exp,
            createdAt: decodedRefreshToken.iat
        } as CreateRefreshSessionDto);
    }

    /**
     * Update refresh session for the authenticated user.
     *
     * @param {RefreshSession} session
     * @param {string} refreshToken
     *
     * @returns {Promise<void>}
     */
    public async updateRefreshSession (
        session: RefreshSession,
        refreshToken: string
    ): Promise<void> {
        const decodedRefreshToken: any = this.jwt.decode(refreshToken);

        await this.refreshSession.update(session.id, {
            refreshToken: refreshToken,
            expiresIn: decodedRefreshToken.exp,
            createdAt: decodedRefreshToken.iat
        } as UpdateRefreshSessionDto);
    }

    /**
     * Logout the currently authenticated user.
     *
     * @param {UserInterface} user
     *
     * @returns {Promise<void>}
     */
    public async logout (user: UserInterface): Promise<void> {
        await this.users.update(user.id, { refreshToken: null });
    }
}
