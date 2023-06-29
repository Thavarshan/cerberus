import { Injectable } from '@nestjs/common';
import { User as UserInterface } from '@/interfaces/users/user.entity';
import { UsersService as UsersServiceInterface } from '@/interfaces/users/users.service';
import { UsersRepository } from '../repositories/users.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

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
        return await this.repository.save(dto);
    }

    /**
     * Query the database for all users.
     *
     * @returns {Promise<UserInterface[]>}
     */
    public async findAll (): Promise<UserInterface[]> {
        return await this.repository.find();
    }

    /**
     * Query the database for a user with the given id.
     *
     * @param {string} id
     *
     * @returns {Promise<UserInterface>}
     */
    public async findOne (id: number): Promise<UserInterface> {
        return await this.repository.findOneBy({ id });
    }

    /**
     * Find the user with the given id and update the details of the user.
     *
     * @param {string} id
     * @param {UpdateUserDto} dto
     *
     * @returns {Promise<UserInterface>}
     */
    public async update (id: number, dto: UpdateUserDto): Promise<UserInterface> {
        await this.repository.update(id, dto);

        return await this.findOne(id);
    }

    /**
     * Find the user with the given id and remove the user from the database.
     *
     * @param {string} id
     *
     * @returns {Promise<void>}
     */
    public async remove (id: number): Promise<void> {
        await this.repository.delete(id);
    }
}
