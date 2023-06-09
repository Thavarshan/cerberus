import { Injectable, NotFoundException } from '@nestjs/common';
import { User as UserInterface } from '@/interfaces/users/user.entity';
import { UsersService as UsersServiceInterface } from '@/interfaces/users/users.service';
import { UsersRepository } from '../repositories/users.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAlreadyExistsException } from '../exceptions/user-already-exists.exception';

@Injectable()
export class UsersService implements UsersServiceInterface {
    /**
     * Create new UsersService instance.
     *
     * @param {UsersRepository} repository
     *
     * @returns {void}
     */
    constructor (
        @InjectRepository(User)
        protected readonly repository: UsersRepository
    ) { }

    /**
     * Create new user and persist to database.
     *
     * @param {CreateUserDto} dto
     *
     * @returns {Promise<UserInterface>}
     */
    public async create (dto: CreateUserDto): Promise<UserInterface> {
        if (await this.existsByEmail(dto.email)) {
            throw new UserAlreadyExistsException('email', dto.email);
        }

        if (await this.existsByUsername(dto.username)) {
            throw new UserAlreadyExistsException('username', dto.username);
        }

        return await this.repository.save(dto);
    }

    /**
     * Query the database for all users.
     *
     * @param {object|undefined} query
     *
     * @returns {Promise<UserInterface[]>}
     */
    public async findAll (
        query?: { [key: string]: any; }
    ): Promise<UserInterface[]> {
        return await this.repository.find({ where: query });
    }

    /**
     * Query the database for a user with the given id.
     *
     * @param {string} id
     *
     * @returns {Promise<UserInterface>}
     */
    public async findOne (id: string): Promise<UserInterface> {
        const user = await this.repository.findOneBy({ id });

        if (user === null) {
            throw new NotFoundException(`User with id [${id}] not found.`);
        }

        return user;
    }

    /**
     * Query the database for a user with the given email.
     *
     * @param {string} email
     *
     * @returns {Promise<User>}
     */
    public async findByEmail (email: string): Promise<User> {
        const user = await this.repository.findOneBy({ email });

        if (!user) {
            throw new NotFoundException(`User with email ${email} not found.`);
        }

        return user;
    }

    /**
     * Query the database for a user with the given username.
     *
     * @param {string} username
     *
     * @returns {Promise<User>}
     */
    public async findByUsername (username: string): Promise<User> {
        const user = await this.repository.findOneBy({ username });

        if (!user) {
            throw new NotFoundException(`User with username ${username} not found.`);
        }

        return user;
    }

    /**
     * Query the database for the existance of the user with the given email.
     *
     * @param {string} email
     *
     * @returns {Promise<User>}
     */
    public async existsByEmail (email: string): Promise<boolean> {
        try {
            await this.findByEmail(email);
        } catch (error) {
            return false;
        }

        return true;
    }

    /**
     * Query the database for the existance of the user with the given username.
     *
     * @param {string} username
     *
     * @returns {Promise<User>}
     */
    public async existsByUsername (username: string): Promise<boolean> {
        try {
            await this.findByUsername(username);
        } catch (error) {
            return false;
        }

        return true;
    }

    /**
     * Find the user with the given id and update the details of the user.
     *
     * @param {string} id
     * @param {UpdateUserDto} dto
     *
     * @returns {Promise<UserInterface>}
     */
    public async update (
        id: string,
        dto: UpdateUserDto
    ): Promise<UserInterface> {
        const user = await this.findOne(id);

        await this.repository.update(user.id, dto);

        return user;
    }

    /**
     * Find the user with the given id and remove the user from the database.
     *
     * @param {string} id
     *
     * @returns {Promise<void>}
     */
    public async delete (id: string): Promise<void> {
        const user = await this.findOne(id);

        await this.repository.delete(user.id);
    }
}
