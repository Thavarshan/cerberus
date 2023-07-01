import { AccessToken } from './access.token';
import { Credentials } from './credentials.interface';

export interface AuthService {
    /**
     * Authenticate user with the given credentials.
     *
     * @param {Credentials} credentials
     *
     * @returns {Promise<{ [key: string]: any; }>}
     */
    authenticate (credentials: Credentials): Promise<AccessToken>;
}
