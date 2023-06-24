import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '@/interfaces/user/user';
import { User as UserEnum } from '../enums/user.enum';
import { UserRepository as UserRepositoryInterface } from '@/interfaces/user/user.repository';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
    /**
     * Create new user repository instance.
     *
     * @param {User} model
     *
     * @returns {void}
     */
    constructor (
        @Inject(UserEnum.MODEL) protected model: Model<User>
    ) { }

    /**
     * Create a new user.
     *
     * @param {CreateUserDto} dto
     *
     * @returns {Promise<User>}
     */
    public async create (dto: CreateUserDto): Promise<User> {
        return await this.model.create(dto);
    }

    /**
     * Find all users.
     *
     * @returns {Promise<User[]>}
     */
    public async findAll (): Promise<User[]> {
        return await this.model.find().exec();
    }

    /**
     * Find one user by id.
     *
     * @param {string} id
     *
     * @returns {Promise<User>}
     */
    public async findOne (id: string): Promise<User> {
        return await this.model.findById(id).exec();
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
        return await this.model
            .findByIdAndUpdate(id, dto, { new: true })
            .exec();
    }

    /**
     * Delete a user.
     *
     * @param {string} id
     *
     * @returns {Promise<void>}
     */
    public async delete (id: string): Promise<void> {
        await this.model.findByIdAndDelete(id).exec();
    }
}
