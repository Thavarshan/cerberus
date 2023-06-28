import { createConnection } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { ConnectionException } from '../exceptions/connection.exception';
import { Connection } from '@/interfaces/database/connection.interface';
import { AbstractConnection } from './abstract.connection';

@Injectable()
export class MongoDb extends AbstractConnection implements Connection {
    /**
     * Create a usable Database Connection instance.
     *
     * @return  {Promise<Connection>}
     */
    public async make (): Promise<Connection> {
        const connection = await createConnection(
            this.config.drivers.mongodb.uri
        ).asPromise();

        if (!connection || !connection.readyState) {
            throw new ConnectionException('Failed to connect to database.');
        }

        connection.on('disconnect', () => {
            this.logger.log('Disconnecting from MongoDB database.');
        });

        this.connection = connection;

        return this;
    }
}
