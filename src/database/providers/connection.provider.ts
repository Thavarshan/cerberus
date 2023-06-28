import { DB } from '@/database/enums/db.enum';
import { ConfigType } from '@nestjs/config';
import dbConfig from '@/config/database.config';
import { LoggerService } from '@/logger/services/logger.service';
import { Provider } from '@nestjs/common';
import { Connection as ConnectionInterface } from '@/interfaces/database/connection.interface';
import { makeInstance } from '@/shared/helpers';

/**
 * Get the path to the connection module.
 *
 * @param {string} db
 *
 * @returns {string}
 */
const getConnectionModulePath = (db: string): string => {
    return `database/connections/${db}.connection`;
};

export const providers: Provider[] = [
    {
        provide: DB.KEY,

        useFactory: async (
            config: ConfigType<typeof dbConfig>
        ): Promise<ConnectionInterface> => {
            const db = await makeInstance(
                getConnectionModulePath(config.defaults.connection),
                [config, new LoggerService()]
            );

            await db.make();

            return db.getConnection();
        },

        inject: [dbConfig.KEY, LoggerService],
    }
];
