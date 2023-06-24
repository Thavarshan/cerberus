import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '@/interfaces/user/user';
import { UserService as UserServiceInterface } from '@/interfaces/user/user.service';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService implements UserServiceInterface {
    /**
     * User repository instance.
     *
     * @var {UserRepository}
     */
    protected readonly repository: UserRepository;

    /**
     * Create new user service instance.
     *
     * @param {UserRepository} repository
     *
     * @returns {void}
     */
    constructor (repository: UserRepository) {
        this.repository = repository;
    }

    /**
     * Create a new user.
     *
     * @param {CreateUserDto} dto
     *
     * @returns {Promise<User>}
     */
    public async create (dto: CreateUserDto): Promise<User> {
        return await this.repository.create(dto);
    }

    /**
     * Find all users.
     *
     * @returns {Promise<User[]>}
     */
    public async findAll (): Promise<User[]> {
        return await this.repository.findAll();
    }

    /**
     * Find one user by id.
     *
     * @param {string} id
     *
     * @returns {Promise<User>}
     */
    public async findOne (id: string): Promise<User> {
        return await this.repository.findOne(id);
    }

    /**
     * Update a user.
     *
     * @param {string} id
     * @param {UpdateUserDto} dto
     *
     * @returns {Promise<User>}
     */
    public async update (id: string, dto: UpdateUserDto): Promise<User> {
        return await this.repository.update(id, dto);
    }

    /**
     * Delete a user.
     *
     * @param {string} id
     *
     * @returns {Promise<void>}
     */
    public async delete (id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
