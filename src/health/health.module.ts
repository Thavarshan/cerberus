import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import HealthService from './services/health.service';

@Module({
    imports: [
        TerminusModule
    ],

    providers: [HealthService],
    exports: [HealthService]
})
export default class HealthModule { }
