import { DynamicModule } from '@nestjs/common';
import { LoggerService } from '@/logger/services/logger.service';
import { createProviders } from './providers/logger.provider';

export class LoggerModule {
    static forRoot (): DynamicModule {
        const prefixedLoggerProviders = createProviders();

        return {
            module: LoggerModule,
            providers: [LoggerService, ...prefixedLoggerProviders],
            exports: [LoggerService, ...prefixedLoggerProviders],
        };
    }
}
