import { Credentials } from './credentials.interface';
import { AuthResponse } from './auth-response';
export interface AuthService {
    authenticate(credentials: Credentials): Promise<AuthResponse>;
}
//# sourceMappingURL=auth.service.d.ts.map