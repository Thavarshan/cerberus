"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
const config_1 = require("@nestjs/config");
const dbConfig = (0, config_1.registerAs)('database', () => ({
    defaults: {
        connection: process.env.DB_CONNECTION || 'mysql',
    },
    drivers: {
        mysql: {
            database: process.env.DB_DATABASE || 'cerberus',
            user: process.env.DB_USERNAME || 'root',
            password: process.env.DB_PASSWORD || '',
            port: parseInt(process.env.DB_PORT, 10) || 3306,
            host: process.env.DB_HOST || '127.0.0.1',
            url: process.env.DB_URL,
        },
        mongodb: {
            database: process.env.DB_DATABASE || 'cerberus',
            url: process.env.DB_URL || 'mongodb://localhost/cerberus',
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
            }
        }
    }
}));
exports.dbConfig = dbConfig;
//# sourceMappingURL=database.config.js.map