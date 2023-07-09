import { HealthService as HealthServiceInterface } from '@/interfaces/health/health.service';
import { HealthCheckService, MemoryHealthIndicator, TypeOrmHealthIndicator } from '@nestjs/terminus';
export declare class HealthService implements HealthServiceInterface {
    protected readonly health: HealthCheckService;
    protected readonly memory: MemoryHealthIndicator;
    protected readonly db: TypeOrmHealthIndicator;
    constructor(health: HealthCheckService, memory: MemoryHealthIndicator, db: TypeOrmHealthIndicator);
    check(): Promise<any>;
}
//# sourceMappingURL=health.service.d.ts.map