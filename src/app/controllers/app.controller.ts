import {
    Controller,
    Get,
    HttpStatus,
    Req,
    HttpCode
} from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';
import { AppService } from '../services/app.service';
import { Request } from 'express';

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
     * @param {Request} request
     *
     * @return {Promise<string>}
     */
    @HttpCode(HttpStatus.OK)
    @Get()
    @HealthCheck()
    public async index (@Req() request: Request): Promise<any> {
        return await this.service.check(request);
    }
}
