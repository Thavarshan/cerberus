import { Role } from '../entities/role.entity';
export declare class UserDto {
    readonly name: string;
    readonly username?: string;
    readonly email: string;
    password: string;
    readonly phone?: string;
    role?: Partial<Role>;
    readonly verified?: boolean;
}
//# sourceMappingURL=user.dto.d.ts.map