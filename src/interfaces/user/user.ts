export interface User {
    name: string;
    email: string;
    username: string;
    password: string;
    phone: string;
    role: string;
    // team?: Partial<Team>;
    verified?: boolean;
    blockedAt?: Date;
}
