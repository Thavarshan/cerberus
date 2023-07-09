import { UsersService } from '../services/users.service';
import { User } from '@/interfaces/users/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
export declare class UsersController {
    protected readonly service: UsersService;
    constructor(service: UsersService);
    create(dto: CreateUserDto): Promise<User>;
    findAll(query: {
        [key: string]: any;
    }): Promise<{
        [key: string]: User[];
    }>;
    findOne(id: string): Promise<User>;
    update(id: string, dto: UpdateUserDto): Promise<User>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=users.controller.d.ts.map