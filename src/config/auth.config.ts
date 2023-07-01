import { registerAs } from '@nestjs/config';

const authConfig = registerAs('auth', () => ({
    secretKey: process.env.JWT_SECRET || 'fake-kwt-secret-key',
    expiresIn: process.env.JWT_EXPIRATION || '3600s',
}));

export { authConfig };
