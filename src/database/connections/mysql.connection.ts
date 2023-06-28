import { createConnection } from 'mysql2';
import { Injectable } from '@nestjs/common';
import { ConnectionException } from '../exceptions/connection.exception';
import { Connection } from '@/interfaces/database/connection.interface';
import { AbstractConnection } from './abstract.connection';

@Injectable()
export class MySQL extends AbstractConnection implements Connection {
    /**
     * Create a usable Database Connection instance.
     *
     * @return  {Promise<Connection>}
     */
    public async make (): Promise<Connection> {
        const connection = await createConnection(this.config.drivers.mysql);

        if (!connection) {
            throw new ConnectionException('Failed to connect to database.');
        }

        connection.on('disconnect', () => {
            this.logger.log('Disconnecting from MySQL database.');
        });

        this.connection = connection;

        return this;
    }
}
