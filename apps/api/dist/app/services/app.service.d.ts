import { HealthService } from '@/health/services/health.service';
import { AppService as AppServiceInterface } from '@/interfaces/app/app.service';
export declare class AppService implements AppServiceInterface {
    protected readonly health: HealthService;
    constructor(health: HealthService);
    getSystemStatus(): Promise<any>;
}
//# sourceMappingURL=app.service.d.ts.map