import { UserDto } from '@/users/dto/user.dto';
import { User } from './user.entity';

export interface UsersService {
    create (dto: UserDto): Promise<User>;

    findAll (query?: { [key: string]: any; }): Promise<User[]>;

    findOne (id: number | string): Promise<User>;

    update (id: number | string, dto: UserDto): Promise<any>;

    remove (id: number | string): Promise<void>;
}
