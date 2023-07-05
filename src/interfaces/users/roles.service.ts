import { RoleDto } from '@/users/dto/role.dto';
import { Role } from './role.entity';

export interface RolesService {
    /**
     * Create new role and persist to database.
     *
     * @param {CreateRoleDto} dto
     *
     * @returns {Promise<RoleInterface>}
     */
    create (dto: RoleDto): Promise<Role>;

    /**
     * Query the database for all roles.
     *
     * @returns {Promise<RoleInterface[]>}
     */
    findAll (query?: { [key: string]: any; }): Promise<Role[]>;

    /**
     * Query the database for a role with the given id.
     *
     * @param {number} id
     *
     * @returns {Promise<RoleInterface>}
     */
    findOne (id: number): Promise<Role>;

    /**
     * Query the database for a role with the given name.
     *
     * @param {string} name
     *
     * @returns {Promise<Role>}
     */
    findByName (name: string): Promise<Role>;

    /**
     * Query the database for the existance of the role with the given name.
     *
     * @param {string} name
     *
     * @returns {Promise<Role>}
     */
    existsByName (name: string): Promise<boolean>;

    /**
     * Find the role with the given id and update the details of the role.
     *
     * @param {number} id
     * @param {UpdateRoleDto} dto
     *
     * @returns {Promise<RoleInterface>}
     */
    update (id: number, dto: RoleDto): Promise<any>;

    /**
     * Find the role with the given id and remove the role from the database.
     *
     * @param {number} id
     *
     * @returns {Promise<void>}
     */
    delete (id: number): Promise<void>;
}
