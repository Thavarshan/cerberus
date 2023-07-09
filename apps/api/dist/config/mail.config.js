"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailConfig = void 0;
const config_1 = require("@nestjs/config");
const mailConfig = (0, config_1.registerAs)('mail', () => ({
    apiKey: process.env.MAIL_API_KEY || 'SG.test',
}));
exports.mailConfig = mailConfig;
//# sourceMappingURL=mail.config.js.map