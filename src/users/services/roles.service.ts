import { Injectable, NotFoundException } from '@nestjs/common';
import { Role as RoleInterface } from '@/interfaces/users/role.entity';
import { RolesService as RolesServiceInterface } from '@/interfaces/users/roles.service';
import { RolesRepository } from '../repositories/roles.repository';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleAlreadyExistsException } from '../exceptions/role-already-exists.exception';
import { Role } from '../entities/role.entity';
import { Roles } from '../enums/roles.enum';
import slugify from 'slugify';

@Injectable()
export class RolesService implements RolesServiceInterface {
    /**
     * Create new RolesService instance.
     *
     * @param {RolesRepository} repository
     *
     * @returns {void}
     */
    constructor (
        @InjectRepository(Role)
        protected readonly repository: RolesRepository
    ) { }

    /**
     * Run when the application is initialized.
     *
     * @returns {Promise<void>}
     */
    public async onModuleInit (): Promise<void> {
        for (const role in Roles) {
            try {
                await this.create({
                    name: role,
                    slug: slugify(role),
                    description: `User with role ${role}.`
                });
            } catch (error) {
                continue;
            }
        }
    }

    /**
     * Create new role and persist to database.
     *
     * @param {CreateRoleDto} dto
     *
     * @returns {Promise<RoleInterface>}
     */
    public async create (dto: CreateRoleDto): Promise<RoleInterface> {
        if (await this.existsByName(dto.name)) {
            throw new RoleAlreadyExistsException('name', dto.name);
        }

        return await this.repository.save(dto);
    }

    /**
     * Query the database for all roles.
     *
     * @returns {Promise<RoleInterface[]>}
     */
    public async findAll (): Promise<RoleInterface[]> {
        return await this.repository.find();
    }

    /**
     * Query the database for a role with the given id.
     *
     * @param {number} id
     *
     * @returns {Promise<RoleInterface>}
     */
    public async findOne (id: number): Promise<RoleInterface> {
        const role = await this.repository.findOneBy({ id });

        if (role === null) {
            throw new NotFoundException(`Role with id [${id}] not found.`);
        }

        return role;
    }

    /**
     * Query the database for a role with the given name.
     *
     * @param {string} name
     *
     * @returns {Promise<Role>}
     */
    public async findByName (name: string): Promise<Role> {
        const role = await this.repository.findOneBy({ name });

        if (!role) {
            throw new NotFoundException(`Role with name ${name} not found.`);
        }

        return role;
    }

    /**
     * Query the database for the existance of the role with the given name.
     *
     * @param {string} name
     *
     * @returns {Promise<Role>}
     */
    public async existsByName (name: string): Promise<boolean> {
        try {
            await this.findByName(name);
        } catch (error) {
            return false;
        }

        return true;
    }

    /**
     * Find the role with the given id and update the details of the role.
     *
     * @param {number} id
     * @param {UpdateRoleDto} dto
     *
     * @returns {Promise<RoleInterface>}
     */
    public async update (
        id: number,
        dto: UpdateRoleDto
    ): Promise<RoleInterface> {
        const role = await this.findOne(id);

        await this.repository.update(role.id, dto);

        return role;
    }

    /**
     * Find the role with the given id and remove the role from the database.
     *
     * @param {number} id
     *
     * @returns {Promise<void>}
     */
    public async delete (id: number): Promise<void> {
        const role = await this.findOne(id);

        await this.repository.delete(role.id);
    }
}
