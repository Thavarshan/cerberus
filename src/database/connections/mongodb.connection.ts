import dbConfig from '@/config/database.config';
import {
    Connection as MongoDdConnection,
    createConnection
} from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Logger } from '@/logger/decorators/logger.decorator';
import { LoggerService } from '@/logger/services/logger.service';
import { ConnectionException } from '../exceptions/connection.exception';

@Injectable()
export class MongoDb extends MongoDdConnection {
    /**
     * The database URI string.
     *
     * @var {string}
     */
    protected uri: string;

    /**
     * Create new Connection instance.
     *
     * @param {ConfigType<dbConfig>} configs
     * @param {LoggerService}        logger
     *
     * @return  {void}
     */
    constructor (
        @Inject(dbConfig.KEY) protected readonly configs: ConfigType<typeof dbConfig>,
        @Logger('DatabaseConnection') protected logger: LoggerService
    ) {
        super();
    }

    /**
     * Create a usable Database Connection instance.
     *
     * @return  {Promise<MongoDdConnection>}
     */
    public async make (): Promise<MongoDdConnection> {
        const connection = await createConnection(this.configs.uri).asPromise();

        if (!connection || !connection.readyState) {
            throw new ConnectionException('Failed to connect to database.');
        }

        connection.on('disconnect', () => {
            this.logger.log('Disconnecting from database.');
        });

        return connection;
    }
}
