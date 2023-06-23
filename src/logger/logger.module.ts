import { DynamicModule } from '@nestjs/common';
import { Logger } from './logger';
import { LoggerService } from '@/logger/services/logger.service';

export class LoggerModule {
    static forRoot (): DynamicModule {
        const factory = new Logger();
        const prefixedLoggerProviders = factory.createProviders();

        return {
            module: LoggerModule,
            providers: [LoggerService, ...prefixedLoggerProviders],
            exports: [LoggerService, ...prefixedLoggerProviders],
        };
    }
}
