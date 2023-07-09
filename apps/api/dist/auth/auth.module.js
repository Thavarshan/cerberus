"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const users_module_1 = require("../users/users.module");
const auth_controller_1 = require("./controllers/auth.controller");
const jwt_guard_1 = require("./guards/jwt.guard");
const auth_service_1 = require("./services/auth.service");
const config_1 = require("@nestjs/config");
const register_controller_1 = require("./controllers/register.controller");
const register_service_1 = require("./services/register.service");
const auth_config_1 = require("../config/auth.config");
const refresh_session_entity_1 = require("./entities/refresh-session.entity");
const typeorm_1 = require("@nestjs/typeorm");
const refresh_session_service_1 = require("./services/refresh-session.service");
let AuthModule = exports.AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            config_1.ConfigModule.forFeature(auth_config_1.authConfig),
            typeorm_1.TypeOrmModule.forFeature([refresh_session_entity_1.RefreshSession]),
            jwt_1.JwtModule.registerAsync({
                inject: [auth_config_1.authConfig.KEY],
                imports: [config_1.ConfigModule.forFeature(auth_config_1.authConfig)],
                useFactory: (config) => {
                    return {
                        secret: config.secretKey,
                        signOptions: { expiresIn: config.expiresIn },
                    };
                }
            }),
        ],
        providers: [
            register_service_1.RegisterService,
            refresh_session_service_1.RefreshSessionService,
            auth_service_1.AuthService,
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_guard_1.JwtGuard,
            },
        ],
        controllers: [auth_controller_1.AuthController, register_controller_1.RegisterController],
        exports: [auth_service_1.AuthService, register_service_1.RegisterService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map