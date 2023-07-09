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
exports.RefreshSession = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
let RefreshSession = exports.RefreshSession = class RefreshSession {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RefreshSession.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.sessions, { onDelete: 'CASCADE' }),
    __metadata("design:type", Object)
], RefreshSession.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_refresh_token'),
    (0, typeorm_1.Column)({ name: 'refresh_token', type: 'varchar', nullable: false, unique: true }),
    __metadata("design:type", String)
], RefreshSession.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", Object)
], RefreshSession.prototype, "expiresIn", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], RefreshSession.prototype, "createdAt", void 0);
exports.RefreshSession = RefreshSession = __decorate([
    (0, typeorm_1.Entity)({ name: 'refresh_sessions' })
], RefreshSession);
//# sourceMappingURL=refresh-session.entity.js.map