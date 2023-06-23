import { Injectable } from '@nestjs/common';
import { Provider } from '@nestjs/common';
import { prefixesForLoggers } from '@/logger/decorators/logger.decorator';
import { LoggerService } from '@/logger/services/logger.service';

@Injectable()
export class Logger {
    /**
     * Create a logger service instance with appropriate prefix.
     *
     * @param   {LoggerService}  logger
     * @param   {string}         prefix
     *
     * @return  {LoggerService}
     */
    public createInstance (
        service: LoggerService, prefix: string
    ): LoggerService {
        if (prefix) {
            service.setPrefix(prefix);
        }

        return service;
    }

    /**
     * Configure and create a logger service provider with a usable logger service instance.
     *
     * @param   {string}    prefix
     *
     * @return  {Provider<LoggerService>}
     */
    public createProvider (prefix: string): Provider<LoggerService> {
        return {
            provide: `LoggerService${prefix}`,
            useFactory: service => this.createInstance(service, prefix),
            inject: [LoggerService],
        };
    }

    /**
     * Create a list of all predefined logger service providers.
     *
     * @return  {<Array><Provider><LoggerService>}
     */
    public createProviders (): Array<Provider<LoggerService>> {
        return prefixesForLoggers.map(
            prefix => this.createProvider(prefix)
        );
    }
}
