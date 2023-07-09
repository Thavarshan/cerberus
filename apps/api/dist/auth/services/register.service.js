"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterService = void 0;
const users_service_1 = require("../../users/services/users.service");
const bcrypt_1 = require("bcrypt");
const common_1 = require("@nestjs/common");
const auth_enum_1 = require("../enums/auth.enum");
const roles_enum_1 = require("../../users/enums/roles.enum");
const roles_service_1 = require("../../users/services/roles.service");
let RegisterService = exports.RegisterService = class RegisterService {
    constructor(users, roles) {
        this.users = users;
        this.roles = roles;
    }
    async register(dto) {
        dto.password = await this.hashPassword(dto.password);
        dto.role = (await this.setDefaultRole()).id;
        const user = await this.users.create(dto);
        return user;
    }
    async hashPassword(password) {
        const salt = await (0, bcrypt_1.genSalt)(auth_enum_1.Auth.SALT_ROUDS);
        return await (0, bcrypt_1.hash)(password, salt);
    }
    async setDefaultRole() {
        return await this.roles.findByName(roles_enum_1.Roles.USER);
    }
};
exports.RegisterService = RegisterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        roles_service_1.RolesService])
], RegisterService);
//# sourceMappingURL=register.service.js.map