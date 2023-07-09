import { RoleDto } from '@/users/dto/role.dto';
import { OnModuleInit } from '@nestjs/common';
import { Role } from './role.entity';
export interface RolesService extends OnModuleInit {
    create(dto: RoleDto): Promise<Role>;
    findAll(query?: {
        [key: string]: any;
    }): Promise<Role[]>;
    findOne(id: number): Promise<Role>;
    findByName(name: string): Promise<Role>;
    existsByName(name: string): Promise<boolean>;
    update(id: number, dto: RoleDto): Promise<any>;
    delete(id: number): Promise<void>;
}
//# sourceMappingURL=roles.service.d.ts.map