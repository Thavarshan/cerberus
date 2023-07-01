import { Public } from '@/auth/decorators/public.decorator';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor (protected readonly service: AppService) { }

    @Public()
    @Get()
    public async getSystemStatus (): Promise<string> {
        return await this.service.getSystemStatus();
    }
}
