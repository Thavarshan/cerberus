import { DB } from '@/database/enums/db.enum';
import { Connection } from '../connection';
import { Connection as MongoDbConnection } from 'mongoose';
import { ConfigType } from '@nestjs/config';
import dbConfig from '@/config/database.config';
import { LoggerService } from '@/logger/services/logger.service';
import { Provider } from '@nestjs/common';

const connectionProvider: Provider[] = [
    {
        provide: DB.KEY,

        useFactory: async (
            config: ConfigType<typeof dbConfig>
        ): Promise<MongoDbConnection> => {
            const connection = new Connection(config, new LoggerService());

            return await connection.make();
        },

        inject: [dbConfig.KEY, LoggerService],
    }
];

export default connectionProvider;
