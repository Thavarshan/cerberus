import { Provider } from '@nestjs/common';
import { LoggerService } from '../services/logger.service';
import { prefixesForLoggers } from '@/logger/decorators/logger.decorator';

/**
 * Create a list of all predefined logger service providers.
 *
 * @return  {<Array><Provider><LoggerService>}
 */
export const createProviders = (): Array<Provider<LoggerService>> => {
    return prefixesForLoggers.map(prefix => {
        return {
            provide: `LoggerService${prefix}`,
            inject: [LoggerService],
            useFactory: (service: LoggerService) => {
                if (prefix) {
                    service.setPrefix(prefix);
                }

                return service;
            }
        };
    });
};
