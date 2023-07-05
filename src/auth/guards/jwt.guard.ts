import { authConfig } from '@/config/auth.config';
import { UsersService } from '@/users/services/users.service';
import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Auth } from '../enums/auth.enum';

@Injectable()
export class JwtGuard implements CanActivate {
    /**
     * Create new JwtGuard instance.
     *
     * @param {ConfigType<typeof authConfig>} config
     * @param {JwtService} jwt
     * @param {UsersService} users
     * @param {Reflector} reflector
     *
     * @returns {void}
     */
    constructor (
        @Inject(authConfig.KEY)
        protected readonly config: ConfigType<typeof authConfig>,
        protected readonly jwt: JwtService,
        protected readonly users: UsersService,
        protected readonly reflector: Reflector
    ) { }

    /**
     * Handle authentication of incoming request.
     *
     * @param {ExecutionContext} context
     *
     * @returns {Promise<boolean>}
     */
    public async canActivate (context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector
            .getAllAndOverride<boolean>(Auth.IS_PUBLIC_KEY, [
                context.getHandler(),
                context.getClass(),
            ]);

        if (isPublic) {
            // 💡 See this condition
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('Invalid token');
        }

        try {
            const payload = await this.jwt.verifyAsync(token, {
                secret: this.config.secretKey,
            });

            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['payload'] = payload;

            const user = await this.users.findByEmail(payload.username);

            request['user'] = user;
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }

        return true;
    }

    /**
     * Extract token from request header.
     *
     * @param {Request} request
     *
     * @returns {string | undefined}
     */
    protected extractTokenFromHeader (request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];

        return type === 'Bearer' ? token : undefined;
    }
}
