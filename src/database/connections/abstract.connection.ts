import dbConfig from '@/config/database.config';
import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Logger } from '@/logger/decorators/logger.decorator';
import { LoggerService } from '@/logger/services/logger.service';

export abstract class AbstractConnection {
    /**
     * The database connection instance.
     *
     * @var {any}
     */
    protected connection: any;

    /**
     * Create new Connection instance.
     *
     * @param {ConfigType<dbConfig>} config
     * @param {LoggerService}        logger
     *
     * @return  {void}
     */
    constructor (
        @Inject(dbConfig.KEY) protected readonly config: ConfigType<typeof dbConfig>,
        @Logger('DatabaseConnection') protected readonly logger: LoggerService
    ) { }

    /**
     * Get the connection instance.
     *
     * @return  {any}
     */
    public getConnection (): any {
        return this.connection;
    }
}
