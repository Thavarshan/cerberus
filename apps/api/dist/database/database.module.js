"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const logger_module_1 = require("../logger/logger.module");
const config_module_1 = require("../config/config.module");
const database_config_1 = require("../config/database.config");
const common_1 = require("@nestjs/common");
const orm_provider_1 = require("./providers/orm.provider");
let DatabaseModule = exports.DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            logger_module_1.LoggerModule.forRoot(),
            config_module_1.ConfigModule.forFeature(database_config_1.dbConfig),
            orm_provider_1.OrmModule.forRoot(),
        ],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map