import { HealthService as HealthServiceInterface } from '@/interfaces/health/health.service';
import { Injectable } from '@nestjs/common';
import {
    HealthCheckService,
    MemoryHealthIndicator,
    // DiskHealthIndicator,
    TypeOrmHealthIndicator
} from '@nestjs/terminus';

@Injectable()
export class HealthService implements HealthServiceInterface {
    /**
     * Create new HealthService instance.
     *
     * @param health
     * @param memory
     * @param disk
     * @param db
     *
     * @return {void}
     */
    constructor (
        protected readonly health: HealthCheckService,
        protected readonly memory: MemoryHealthIndicator,
        // protected readonly disk: DiskHealthIndicator,
        protected readonly db: TypeOrmHealthIndicator
    ) { }

    /**
     * Check the health of the application.
     *
     * @returns {Promise<any>}
     */
    public async check (): Promise<any> {
        return await this.health.check([
            async () => this.memory.checkHeap('memory_heap', 300 * 1024 * 1024),
            async () => this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024),
            // async () => this.disk.checkStorage('disk health', { thresholdPercent: 0.5, path: '/' }),
            async () => this.db.pingCheck('database', { timeout: 300 })
        ]);
    }
}
