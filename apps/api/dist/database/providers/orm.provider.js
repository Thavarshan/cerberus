"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var OrmModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrmModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const entities_manifest_1 = require("./entities.manifest");
const common_1 = require("@nestjs/common");
let OrmModule = exports.OrmModule = OrmModule_1 = class OrmModule {
    static forRoot() {
        return typeorm_1.TypeOrmModule.forRootAsync({
            useFactory: () => OrmModule_1.configureOrm(),
        });
    }
    static configureOrm(overrides = {}) {
        let connectionConfig;
        const url = process.env.DB_URL;
        if (url && url !== '') {
            connectionConfig = { url };
        }
        else {
            connectionConfig = {
                host: process.env.DB_HOST || '127.0.0.1',
                port: process.env.DB_PORT || 3306,
                username: process.env.DB_USERNAME || 'root',
                password: process.env.DB_PASSWORD || '',
                database: process.env.DB_DATABASE || 'cerberus',
            };
        }
        return Object.assign(Object.assign(Object.assign({}, connectionConfig), {
            type: process.env.DB_CONNECTION || 'mysql',
            synchronize: Boolean(process.env.APP_ENV === 'local'),
            logging: false,
            entities: entities_manifest_1.entities,
            ssl: {
                rejectUnauthorized: false
            },
        }), overrides);
    }
};
exports.OrmModule = OrmModule = OrmModule_1 = __decorate([
    (0, common_1.Module)({})
], OrmModule);
//# sourceMappingURL=orm.provider.js.map