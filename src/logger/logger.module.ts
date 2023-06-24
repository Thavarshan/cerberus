import { DynamicModule } from '@nestjs/common';
import { DefaultLogger } from './loggers/default.logger';
import { LoggerService } from './services/logger.service';

export class LoggerModule {
    static forRoot (): DynamicModule {
        const factory = new DefaultLogger();
        const prefixedLoggerProviders = factory.createProviders();

        return {
            module: LoggerModule,
            providers: [LoggerService, ...prefixedLoggerProviders],
            exports: [LoggerService, ...prefixedLoggerProviders],
        };
    }
}
