import { UserDto } from '@/users/dto/user.dto';
import { User } from './user.entity';

export interface UsersService {
    /**
     * Create new user and persist to database.
     *
     * @param {CreateUserDto} dto
     *
     * @returns {Promise<UserInterface>}
     */
    create (dto: UserDto): Promise<User>;

    /**
     * Query the database for all users.
     *
     * @returns {Promise<UserInterface[]>}
     */
    findAll (query?: { [key: string]: any; }): Promise<User[]>;

    /**
     * Query the database for a user with the given id.
     *
     * @param {string} id
     *
     * @returns {Promise<UserInterface>}
     */
    findOne (id: string): Promise<User>;

    /**
     * Query the database for a user with the given email.
     *
     * @param {string} email
     *
     * @returns {Promise<User>}
     */
    findByEmail (email: string): Promise<User>;

    /**
     * Query the database for a user with the given username.
     *
     * @param {string} username
     *
     * @returns {Promise<User>}
     */
    findByUsername (username: string): Promise<User>;

    /**
     * Query the database for the existance of the user with the given email.
     *
     * @param {string} email
     *
     * @returns {Promise<User>}
     */
    existsByEmail (email: string): Promise<boolean>;

    /**
     * Find the user with the given id and update the details of the user.
     *
     * @param {string} id
     * @param {UpdateUserDto} dto
     *
     * @returns {Promise<UserInterface>}
     */
    update (id: string, dto: UserDto): Promise<any>;

    /**
     * Find the user with the given id and remove the user from the database.
     *
     * @param {string} id
     *
     * @returns {Promise<void>}
     */
    delete (id: string): Promise<void>;
}
