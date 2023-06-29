import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository as UsersRepositoryInterface } from '@/interfaces/users/users.repository';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersRepository extends Repository<User> implements UsersRepositoryInterface {
    /**
     * Query the database for all users.
     *
     * @returns {Promise<User[]>}
     */
    public async findAll (): Promise<User[]> {
        return await this.find();
    }

    /**
     * Query the database for a user with the given email.
     *
     * @param {string} email
     *
     * @returns {Promise<User>}
     */
    public async findByEmail (email: string): Promise<User> {
        const user = await this.findOneBy({ email });

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
        const user = await this.findOneBy({ username });

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
}
