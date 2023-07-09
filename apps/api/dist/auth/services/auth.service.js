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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../../users/services/users.service");
const bcrypt_1 = require("bcrypt");
const auth_config_1 = require("../../config/auth.config");
const access_token_1 = require("../tokens/access.token");
const refresh_token_1 = require("../tokens/refresh.token");
const refresh_session_service_1 = require("./refresh-session.service");
let AuthService = exports.AuthService = class AuthService {
    constructor(config, users, refreshSession, jwt) {
        this.config = config;
        this.users = users;
        this.refreshSession = refreshSession;
        this.jwt = jwt;
    }
    async authenticate(credentials) {
        const user = await this.users.findByEmail(credentials.email);
        (0, bcrypt_1.compare)(credentials.password, user.password, (error, result) => {
            if (error) {
                throw new common_1.UnauthorizedException(error.message);
            }
            return result;
        });
        const accessToken = await this.generateAccessToken(user);
        const refreshToken = await this.generateRefreshToken(user);
        await this.createRefreshSession(user, refreshToken);
        return Object.assign(Object.assign({}, user), { accessToken, refreshToken });
    }
    async refreshToken(token) {
        let decodedToken = undefined;
        try {
            decodedToken = this.jwt.verify(token);
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
        const user = await this
            .users
            .findByEmail(decodedToken.username);
        const session = await this
            .refreshSession
            .findByRefreshToken(token);
        if (!session) {
            throw new common_1.UnauthorizedException('Refresh token not found');
        }
        const accessToken = await this.generateAccessToken(user);
        const refreshToken = await this.generateRefreshToken(user);
        await this.updateRefreshSession(session, refreshToken);
        return Object.assign(Object.assign({}, user), { accessToken, refreshToken });
    }
    async generateAccessToken(user) {
        const accessToken = new access_token_1.AccessToken(this.config, this.jwt, user);
        return await accessToken.generate();
    }
    async generateRefreshToken(user) {
        const refreshToken = new refresh_token_1.RefreshToken(this.config, this.jwt, user);
        return await refreshToken.generate();
    }
    async createRefreshSession(user, refreshToken) {
        const decodedRefreshToken = this.jwt.decode(refreshToken);
        await this.refreshSession.create({
            user: user.id,
            refreshToken: refreshToken,
            expiresIn: decodedRefreshToken.exp,
            createdAt: decodedRefreshToken.iat
        });
    }
    async updateRefreshSession(session, refreshToken) {
        const decodedRefreshToken = this.jwt.decode(refreshToken);
        await this.refreshSession.update(session.id, {
            refreshToken: refreshToken,
            expiresIn: decodedRefreshToken.exp,
            createdAt: decodedRefreshToken.iat
        });
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(auth_config_1.authConfig.KEY)),
    __metadata("design:paramtypes", [void 0, users_service_1.UsersService,
        refresh_session_service_1.RefreshSessionService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map