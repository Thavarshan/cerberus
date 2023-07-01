import { User as UserInterface } from '@/interfaces/users/user.entity';
import { UsersService } from '@/users/services/users.service';
import { RegisterUserDto } from '../dto/register.dto';
import bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RegisterService {
    /**
     * Create new UsersService instance.
     *
     * @param {UsersService} service
     * @param {ConfigService} config
     *
     * @returns {void}
     */
    constructor (
        protected service: UsersService,
        protected readonly config: ConfigService
    ) { }

    public async register (dto: RegisterUserDto): Promise<UserInterface> {
        dto.password = await bcrypt.hash(
            dto.password,
            this.config.get<string>('APP_KEY')
        );

        const user = await this.service.create(dto);

        return user;
    }
}
