import { Injectable } from '@nestjs/common';
import {
    HealthCheckService,
    MongooseHealthIndicator,
    MemoryHealthIndicator,
    DiskHealthIndicator,
} from '@nestjs/terminus';

@Injectable()
export default class HealthService {
    constructor (
        protected readonly health: HealthCheckService,
        protected readonly mongoose: MongooseHealthIndicator,
        protected readonly memory: MemoryHealthIndicator,
        protected readonly disk: DiskHealthIndicator
    ) { }

    public async check (): Promise<any> {
        return await this.health.check([
            async () => this.mongoose.pingCheck('mongoose'),
            async () => this.memory.checkHeap('memory_heap', 200 * 1024 * 1024),
            async () => this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024),
            async () => this.disk.checkStorage('disk health', {
                thresholdPercent: 0.5,
                path: '/',
            }),
            async () => this.disk.checkStorage('disk health', {
                threshold: 250 * 1024 * 1024 * 1024,
                path: '/',
            }),
        ]);
    }
}
