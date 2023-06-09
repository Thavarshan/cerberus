import { Injectable } from '@nestjs/common';
import { HealthService } from '@/health/services/health.service';
import { AppService as AppServiceInterface } from '@/interfaces/app/app.service';

@Injectable()
export class AppService implements AppServiceInterface {
    /**
     * Create new AppService instance.
     *
     * @param {HealthService} health
     *
     * @return {void}
     */
    constructor (protected readonly health: HealthService) { }

    /**
     * Perform health check and log visitor IP address.
     *
     * @return  {Promise<any>}
     */
    public async getSystemStatus (): Promise<any> {
        return await this.health.check();
    }
}
