import { User as UserInterface } from '@/interfaces/users/user.entity';
import { UsersService } from '@/users/services/users.service';
import { RegisterUserDto } from '../dto/register.dto';
import { hash, genSalt } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { Auth } from '../enums/auth.enum';

@Injectable()
export class RegisterService {
    /**
     * Create new UsersService instance.
     *
     * @param {UsersService} service
     *
     * @returns {void}
     */
    constructor (protected service: UsersService) { }

    /**
     * Register a new user and persist user details tho te database.
     *
     * @param {RegisterUserDto} dto
     *
     * @returns {Promise<UserInterface>}
     */
    public async register (dto: RegisterUserDto): Promise<UserInterface> {
        const salt = await genSalt(Auth.SALT_ROUDS);

        dto.password = await hash(dto.password, salt);

        const user = await this.service.create(dto);

        return user;
    }
}
