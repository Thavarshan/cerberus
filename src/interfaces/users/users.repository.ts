import { User } from './user.entity';

export interface UsersRepository {
    findAll (): Promise<User[]>;
    findByEmail (email: string): Promise<User>;
    findByUsername (username: string): Promise<User>;
    existsByEmail (email: string): Promise<boolean>;
}
