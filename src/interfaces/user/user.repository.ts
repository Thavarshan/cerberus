import { CreateUserDto } from '@/user/dto/create-user.dto';
import { User } from './user';
import { UpdateUserDto } from '@/user/dto/update-user.dto';

export interface UserRepository {
    /**
     * Create a new user.
     *
     * @param {CreateUserDto} dto
     *
     * @returns {Promise<User>}
     */
    create (dto: CreateUserDto): Promise<User>;

    /**
     * Find all users.
     *
     * @returns {Promise<User[]>}
     */
    findAll (): Promise<User[]>;

    /**
     * Find one user by id.
     *
     * @param {string} id
     *
     * @returns {Promise<User>}
     */
    findOne (id: string): Promise<User>;

    /**
     * Update a user.
     *
     * @param {string} id
     * @param {UpdateUserDto} dto
     *
     * @returns {Promise<User>}
     */
    update (id: string, dto: UpdateUserDto): Promise<User>;

    /**
     * Delete a user.
     *
     * @param {string} id
     *
     * @returns {Promise<void>}
     */
    delete (id: string): Promise<void>;
}
