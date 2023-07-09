import { RegisterUserDto } from '../dto/register.dto';
import { User } from '@/interfaces/users/user.entity';
import { RegisterService } from '@/auth/services/register.service';
export declare class RegisterController {
    protected service: RegisterService;
    constructor(service: RegisterService);
    register(dto: RegisterUserDto): Promise<User>;
}
//# sourceMappingURL=register.controller.d.ts.map