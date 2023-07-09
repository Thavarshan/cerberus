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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtGuard = void 0;
const auth_config_1 = require("../../config/auth.config");
const users_service_1 = require("../../users/services/users.service");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const auth_enum_1 = require("../enums/auth.enum");
let JwtGuard = exports.JwtGuard = class JwtGuard {
    constructor(config, jwt, users, reflector) {
        this.config = config;
        this.jwt = jwt;
        this.users = users;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const isPublic = this.reflector
            .getAllAndOverride(auth_enum_1.Auth.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
        try {
            const payload = await this.jwt.verifyAsync(token, {
                secret: this.config.secretKey,
            });
            request['payload'] = payload;
            const user = await this.users.findByEmail(payload.username);
            request['user'] = user;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
        return true;
    }
    extractTokenFromHeader(request) {
        var _a, _b;
        const [type, token] = (_b = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')) !== null && _b !== void 0 ? _b : [];
        return type === 'Bearer' ? token : undefined;
    }
};
exports.JwtGuard = JwtGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(auth_config_1.authConfig.KEY)),
    __metadata("design:paramtypes", [void 0, jwt_1.JwtService,
        users_service_1.UsersService,
        core_1.Reflector])
], JwtGuard);
//# sourceMappingURL=jwt.guard.js.map