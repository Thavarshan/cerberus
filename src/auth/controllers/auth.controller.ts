import {
    Body,
    Controller,
    Get,
    Post,
    HttpCode,
    HttpStatus
} from '@nestjs/common';
import { AuthService } from '@/auth/services/auth.service';
import { User as UserInterface } from '@/interfaces/users/user.entity';
import { Credentials } from '../dto/credentials.dto';
import { Public } from '../decorators/public.decorator';
import { User } from '../decorators/user.decorator';
import { RefreshToken } from '../decorators/refresh.decorator';
import { AuthResponse } from '@/interfaces/auth/auth-response';

@Controller()
export class AuthController {
    constructor (protected readonly service: AuthService) { }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    public async login (@Body() dto: Credentials): Promise<AuthResponse> {
        return await this.service.authenticate(dto);
    }

    @Get('user')
    public async user (
        @User() user: UserInterface
    ): Promise<UserInterface> {
        return user;
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('refresh')
    public async refreshTokens (
        @RefreshToken() refreshToken: string
    ): Promise<any> {
        return await this.service.refreshToken(refreshToken);
    }

    @HttpCode(HttpStatus.OK)
    @Post('logout')
    public async logout (@User() user: UserInterface): Promise<void> {
        return await this.service.logout(user);
    }
}
