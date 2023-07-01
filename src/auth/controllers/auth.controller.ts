import { Body, Controller, Get, Post, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '@/auth/services/auth.service';
import { User } from '@/interfaces/users/user.entity';
import { Credentials } from '../dto/credentials.dto';
import { Public } from '../decorators/public.decorator';

@Controller()
export class AuthController {
    constructor (protected readonly service: AuthService) { }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    public async login (@Body() dto: Credentials): Promise<any> {
        return await this.service.authenticate(dto);
    }

    @Get('user')
    public async user (@Request() request): Promise<User> {
        return request.user;
    }
}
