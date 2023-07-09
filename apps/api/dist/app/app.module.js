"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./controllers/app.controller");
const app_service_1 = require("./services/app.service");
const database_module_1 = require("../database/database.module");
const logger_module_1 = require("../logger/logger.module");
const mail_module_1 = require("../mail/mail.module");
const config_module_1 = require("../config/config.module");
const users_module_1 = require("../users/users.module");
const auth_module_1 = require("../auth/auth.module");
const health_module_1 = require("../health/health.module");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mail_module_1.MailModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            database_module_1.DatabaseModule,
            health_module_1.HealthModule,
            logger_module_1.LoggerModule.forRoot(),
            config_module_1.ConfigModule.forRoot({ isGlobal: true }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map