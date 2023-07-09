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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const roles_repository_1 = require("../repositories/roles.repository");
const typeorm_1 = require("@nestjs/typeorm");
const role_already_exists_exception_1 = require("../exceptions/role-already-exists.exception");
const role_entity_1 = require("../entities/role.entity");
const roles_enum_1 = require("../enums/roles.enum");
const slugify_1 = __importDefault(require("slugify"));
let RolesService = exports.RolesService = class RolesService {
    constructor(repository) {
        this.repository = repository;
    }
    async onModuleInit() {
        for (const role in roles_enum_1.Roles) {
            try {
                await this.create({
                    name: role,
                    slug: (0, slugify_1.default)(role),
                    description: `User with role ${role}.`
                });
            }
            catch (error) {
                continue;
            }
        }
    }
    async create(dto) {
        if (await this.existsByName(dto.name)) {
            throw new role_already_exists_exception_1.RoleAlreadyExistsException('name', dto.name);
        }
        return await this.repository.save(dto);
    }
    async findAll() {
        return await this.repository.find();
    }
    async findOne(id) {
        const role = await this.repository.findOneBy({ id });
        if (role === null) {
            throw new common_1.NotFoundException(`Role with id [${id}] not found.`);
        }
        return role;
    }
    async findByName(name) {
        const role = await this.repository.findOneBy({ name });
        if (!role) {
            throw new common_1.NotFoundException(`Role with name ${name} not found.`);
        }
        return role;
    }
    async existsByName(name) {
        try {
            await this.findByName(name);
        }
        catch (error) {
            return false;
        }
        return true;
    }
    async update(id, dto) {
        const role = await this.findOne(id);
        await this.repository.update(role.id, dto);
        return role;
    }
    async delete(id) {
        const role = await this.findOne(id);
        await this.repository.delete(role.id);
    }
};
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [roles_repository_1.RolesRepository])
], RolesService);
//# sourceMappingURL=roles.service.js.map