import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
export declare class RolesRepository extends Repository<Role> {
    findAll(): Promise<Role[]>;
}
//# sourceMappingURL=roles.repository.d.ts.map