import { RolesService } from '../services/roles.service';
import { Role } from '@/interfaces/users/role.entity';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { CreateRoleDto } from '../dto/create-role.dto';
export declare class RolesController {
    protected readonly service: RolesService;
    constructor(service: RolesService);
    create(dto: CreateRoleDto): Promise<Role>;
    findAll(): Promise<{
        [key: string]: Role[];
    }>;
    findOne(id: number): Promise<Role>;
    update(id: number, dto: UpdateRoleDto): Promise<Role>;
    delete(id: number): Promise<void>;
}
//# sourceMappingURL=roles.controller.d.ts.map