"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./services/users.service");
const users_controller_1 = require("./controllers/users.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const users_repository_1 = require("./repositories/users.repository");
const refresh_session_entity_1 = require("../auth/entities/refresh-session.entity");
const role_entity_1 = require("./entities/role.entity");
const roles_service_1 = require("./services/roles.service");
const roles_repository_1 = require("./repositories/roles.repository");
let UsersModule = exports.UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.User,
                role_entity_1.Role,
                refresh_session_entity_1.RefreshSession
            ])],
        exports: [typeorm_1.TypeOrmModule, users_service_1.UsersService, roles_service_1.RolesService],
        providers: [
            users_service_1.UsersService,
            users_repository_1.UsersRepository,
            roles_service_1.RolesService,
            roles_repository_1.RolesRepository
        ],
        controllers: [users_controller_1.UsersController],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map