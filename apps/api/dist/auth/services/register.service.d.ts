import { User as UserInterface } from '@/interfaces/users/user.entity';
import { UsersService } from '@/users/services/users.service';
import { RegisterUserDto } from '../dto/register.dto';
import { RolesService } from '@/users/services/roles.service';
import { Role } from '@/interfaces/users/role.entity';
export declare class RegisterService {
    protected users: UsersService;
    protected readonly roles: RolesService;
    constructor(users: UsersService, roles: RolesService);
    register(dto: RegisterUserDto): Promise<UserInterface>;
    hashPassword(password: string): Promise<string>;
    protected setDefaultRole(): Promise<Role>;
}
//# sourceMappingURL=register.service.d.ts.map