"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('app', () => ({
    name: process.env.APP_NAME || 'Cerberus',
    key: process.env.KEY,
    port: process.env.PORT || 3000
}));
//# sourceMappingURL=app.config.js.map