import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterUserDto } from '../dto/register.dto';
import { User } from '@/interfaces/users/user.entity';
import { RegisterService } from '@/auth/services/register.service';
import { Public } from '../decorators/public.decorator';

@Controller()
export class RegisterController {
    /**
     * Create new RegisterController instance.
     *
     * @param {UsersService} service
     *
     * @returns {void}
     */
    constructor (protected service: RegisterService) { }

    /**
     * Register new user.
     *
     * @param {RegisterUserDto} dto
     *
     * @returns {Promise<User>}
     */
    @Public()
    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    public async register (@Body() dto: RegisterUserDto): Promise<User> {
        return await this.service.register(dto);
    }
}
