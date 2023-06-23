import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
    constructor (private readonly service: AppService) { }

    @Get()
    getHello (): string {
        return this.service.getHello();
    }
}