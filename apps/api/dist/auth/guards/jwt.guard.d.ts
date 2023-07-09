import { authConfig } from '@/config/auth.config';
import { UsersService } from '@/users/services/users.service';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
export declare class JwtGuard implements CanActivate {
    protected readonly config: ConfigType<typeof authConfig>;
    protected readonly jwt: JwtService;
    protected readonly users: UsersService;
    protected readonly reflector: Reflector;
    constructor(config: ConfigType<typeof authConfig>, jwt: JwtService, users: UsersService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
    protected extractTokenFromHeader(request: Request): string | undefined;
}
//# sourceMappingURL=jwt.guard.d.ts.map