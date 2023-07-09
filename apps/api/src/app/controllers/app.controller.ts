import { Public } from '@/auth/decorators/public.decorator';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
    /**
     * Create new AppController instance.
     *
     * @param   {AppService}  service
     *
     * @return  {void}
     */
    constructor (protected readonly service: AppService) { }

    /**
     * The first page of the app.
     *
     * @return {Promise<string>}
     */
    @Public()
    @HttpCode(HttpStatus.OK)
    @Get()
    @HealthCheck()
    public async getSystemStatus (): Promise<any> {
        return await this.service.getSystemStatus();
    }
}
