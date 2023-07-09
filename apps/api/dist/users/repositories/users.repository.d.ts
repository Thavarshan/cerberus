import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
export declare class UsersRepository extends Repository<User> {
    findAll(): Promise<User[]>;
}
//# sourceMappingURL=users.repository.d.ts.map