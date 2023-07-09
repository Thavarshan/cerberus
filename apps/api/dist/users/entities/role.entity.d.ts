import { Role as RoleInterface } from '@/interfaces/users/role.entity';
import { User } from './user.entity';
export declare class Role implements RoleInterface {
    readonly id: number;
    name: string;
    description: string;
    slug: string;
    users?: Partial<User>[];
    protected generateSlug(): void;
}
//# sourceMappingURL=role.entity.d.ts.map