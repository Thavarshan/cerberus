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
exports.RefreshSessionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const refresh_session_entity_1 = require("../entities/refresh-session.entity");
let RefreshSessionService = exports.RefreshSessionService = class RefreshSessionService {
    constructor(repository) {
        this.repository = repository;
    }
    async create(dto) {
        return await this.repository.save(dto);
    }
    async findOne(id) {
        const session = await this.repository.findOneBy({ id });
        if (session === null) {
            throw new common_1.NotFoundException(`User with id [${id}] not found.`);
        }
        return session;
    }
    async findByRefreshToken(refreshToken) {
        return await this.repository.findOneBy({ refreshToken });
    }
    async update(id, dto) {
        const session = await this.findOne(id);
        await this.repository.update(session.id, dto);
        return session;
    }
};
exports.RefreshSessionService = RefreshSessionService = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(refresh_session_entity_1.RefreshSession)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RefreshSessionService);
//# sourceMappingURL=refresh-session.service.js.map