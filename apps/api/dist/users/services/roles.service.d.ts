import { Role as RoleInterface } from '@/interfaces/users/role.entity';
import { RolesService as RolesServiceInterface } from '@/interfaces/users/roles.service';
import { RolesRepository } from '../repositories/roles.repository';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { Role } from '../entities/role.entity';
export declare class RolesService implements RolesServiceInterface {
    protected readonly repository: RolesRepository;
    constructor(repository: RolesRepository);
    onModuleInit(): Promise<void>;
    create(dto: CreateRoleDto): Promise<RoleInterface>;
    findAll(): Promise<RoleInterface[]>;
    findOne(id: number): Promise<RoleInterface>;
    findByName(name: string): Promise<Role>;
    existsByName(name: string): Promise<boolean>;
    update(id: number, dto: UpdateRoleDto): Promise<RoleInterface>;
    delete(id: number): Promise<void>;
}
//# sourceMappingURL=roles.service.d.ts.map