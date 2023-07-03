import { authConfig } from '@/config/auth.config';
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
    constructor (
        @Inject(authConfig.KEY)
        protected readonly config: ConfigType<typeof authConfig>,
        private readonly jwt: JwtService,
        private readonly reflector: Reflector
    ) { }

    public async canActivate (context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(Auth.IS_PUBLIC_KEY, [
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
            request['user'] = payload;
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }

        return true;
    }

    protected extractTokenFromHeader (request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];

        return type === 'Bearer' ? token : undefined;
    }
}
