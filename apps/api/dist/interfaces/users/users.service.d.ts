import { UserDto } from '@/users/dto/user.dto';
import { User } from './user.entity';
export interface UsersService {
    create(dto: UserDto): Promise<User>;
    findAll(query?: {
        [key: string]: any;
    }): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findByUsername(username: string): Promise<User>;
    existsByEmail(email: string): Promise<boolean>;
    update(id: string, dto: UserDto): Promise<any>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=users.service.d.ts.map