import { User } from '../users/user.entity';

export interface AccessToken extends User {
    accessToken: string;
}
