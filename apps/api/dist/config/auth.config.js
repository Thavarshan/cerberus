"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authConfig = void 0;
const config_1 = require("@nestjs/config");
const authConfig = (0, config_1.registerAs)('auth', () => ({
    secretKey: process.env.JWT_SECRET || 'fake-jwt-secret-key',
    expiresIn: process.env.JWT_EXPIRATION || '24h',
}));
exports.authConfig = authConfig;
//# sourceMappingURL=auth.config.js.map