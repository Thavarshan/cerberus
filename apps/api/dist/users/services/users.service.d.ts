import { User as UserInterface } from '@/interfaces/users/user.entity';
import { UsersService as UsersServiceInterface } from '@/interfaces/users/users.service';
import { UsersRepository } from '../repositories/users.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
export declare class UsersService implements UsersServiceInterface {
    protected readonly repository: UsersRepository;
    constructor(repository: UsersRepository);
    create(dto: CreateUserDto): Promise<UserInterface>;
    findAll(query?: {
        [key: string]: any;
    }): Promise<UserInterface[]>;
    findOne(id: string): Promise<UserInterface>;
    findByEmail(email: string): Promise<User>;
    findByUsername(username: string): Promise<User>;
    existsByEmail(email: string): Promise<boolean>;
    existsByUsername(username: string): Promise<boolean>;
    update(id: string, dto: UpdateUserDto): Promise<UserInterface>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=users.service.d.ts.map