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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const typeorm_1 = require("typeorm");
const slugify_1 = __importDefault(require("slugify"));
const lodash_1 = __importDefault(require("lodash"));
const user_entity_1 = require("./user.entity");
const roles_enum_1 = require("../enums/roles.enum");
let Role = exports.Role = class Role {
    generateSlug() {
        this.slug = lodash_1.default.uniqueId((0, slugify_1.default)(this.name, { lower: true }));
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Role.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_name'),
    (0, typeorm_1.Column)({
        name: 'name',
        type: 'enum',
        nullable: false,
        unique: true,
        enum: roles_enum_1.Roles,
        default: roles_enum_1.Roles.USER
    }),
    __metadata("design:type", String)
], Role.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_description'),
    (0, typeorm_1.Column)({ name: 'description', type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Role.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_slug'),
    (0, typeorm_1.Column)({
        name: 'slug',
        type: 'varchar',
        nullable: false,
        unique: true
    }),
    __metadata("design:type", String)
], Role.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, user => user.sessions, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Role.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Role.prototype, "generateSlug", null);
exports.Role = Role = __decorate([
    (0, typeorm_1.Entity)({ name: 'roles' })
], Role);
//# sourceMappingURL=role.entity.js.map