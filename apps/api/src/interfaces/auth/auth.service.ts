import { Credentials } from './credentials.interface';
import { AuthResponse } from './auth-response';

export interface AuthService {
    /**
     * Authenticate user with the given credentials.
     *
     * @param {Credentials} credentials
     *
     * @returns {Promise<AuthResponse>}
     */
    authenticate (credentials: Credentials): Promise<AuthResponse>;
}
