import { User as UserInterface } from '@/interfaces/users/user.entity';
import { UsersService } from '@/users/services/users.service';
import { RegisterUserDto } from '../dto/register.dto';
import { hash, genSalt } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { Auth } from '../enums/auth.enum';
import { Role as RoleEnum } from '@/users/enums/role.enum';
import { RolesService } from '@/users/services/roles.service';
import { Role } from '@/interfaces/users/role.entity';

@Injectable()
export class RegisterService {
    /**
     * Create new UsersService instance.
     *
     * @param {UsersService} users
     * @param {RolesService} roles
     *
     * @returns {void}
     */
    constructor (
        protected users: UsersService,
        protected readonly roles: RolesService
    ) { }

    /**
     * Register a new user and persist user details tho te database.
     *
     * @param {RegisterUserDto} dto
     *
     * @returns {Promise<UserInterface>}
     */
    public async register (dto: RegisterUserDto): Promise<UserInterface> {
        dto.password = await this.hashPassword(dto.password);
        dto.role = (await this.setDefaultRole()).id as Partial<Role>;

        const user = await this.users.create(dto);

        return user;
    }

    /**
     * Hash the given user's password value.
     *
     * @param {string} password
     *
     * @returns {Promise<string>}
     */
    public async hashPassword (password: string): Promise<string> {
        const salt = await genSalt(Auth.SALT_ROUDS);

        return await hash(password, salt);
    }

    /**
     * Set default role for new user.
     *
     * @returns {Promise<Role>}
     */
    protected async setDefaultRole (): Promise<Role> {
        return await this.roles.findByName(RoleEnum.USER);
    }
}
