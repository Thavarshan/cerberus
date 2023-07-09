import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersRepository extends Repository<User> {
    /**
     * Query the database for all users.
     *
     * @returns {Promise<User[]>}
     */
    public async findAll (): Promise<User[]> {
        return await this.find();
    }
}
