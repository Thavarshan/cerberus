import { Injectable } from '@nestjs/common';
import { Logger } from '@/logger/decorators/logger.decorator';
import { LoggerService } from '@/logger/services/logger.service';
import { Request } from 'express';
import { HealthService } from '@/health/services/health.service';

@Injectable()
export class AppService {
    /**
     * Create new AppService instance.
     *
     * @param {LoggerService} logger
     *
     * @return {void}
     */
    constructor (
        @Logger('AppService') protected logger: LoggerService,
        protected health: HealthService
    ) { }

    /**
     * Perform health check and log visitor IP address.
     *
     * @param   {Request}  request
     *
     * @return  {void}
     */
    public async check (request: Request): Promise<any> {
        this.logger.log(request.ip);

        return await this.health.check();
    }
}
