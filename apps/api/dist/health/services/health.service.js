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
exports.HealthService = void 0;
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
let HealthService = exports.HealthService = class HealthService {
    constructor(health, memory, db) {
        this.health = health;
        this.memory = memory;
        this.db = db;
    }
    async check() {
        return await this.health.check([
            async () => this.memory.checkHeap('memory_heap', 300 * 1024 * 1024),
            async () => this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024),
            async () => this.db.pingCheck('database', { timeout: 300 })
        ]);
    }
};
exports.HealthService = HealthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [terminus_1.HealthCheckService,
        terminus_1.MemoryHealthIndicator,
        terminus_1.TypeOrmHealthIndicator])
], HealthService);
//# sourceMappingURL=health.service.js.map