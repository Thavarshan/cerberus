import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';

@Injectable()
export class RolesRepository extends Repository<Role> {
    /**
     * Query the database for all users.
     *
     * @returns {Promise<Role[]>}
     */
    public async findAll (): Promise<Role[]> {
        return await this.find();
    }
}
