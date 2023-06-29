import { UserDto } from '@/users/dto/user.dto';
import { User } from './user.entity';

export interface UsersService {
    create (dto: UserDto): Promise<User>;

    findAll (query?: { [key: string]: any; }): Promise<User[]>;

    findOne (id: number): Promise<User>;

    update (id: number, dto: UserDto): Promise<any>;

    remove (id: number): Promise<void>;
}
