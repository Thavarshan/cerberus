import { registerAs } from '@nestjs/config';

const authConfig = registerAs('auth', () => ({
    secretKey: process.env.JWT_SECRET || 'fake-jwt-secret-key',
    secretRefreshKey: process.env.JWT_REFRESH_SECRET || 'fake-jwt-secret-refresh-key',
    expiresIn: process.env.JWT_EXPIRATION || '24h',
}));

export { authConfig };
