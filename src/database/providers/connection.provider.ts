import { DB } from '../enums/db.enum';
import { MongoDb } from '../connections/mongodb.connection';
import { Connection as MongoDbConnection } from 'mongoose';
import { ConfigType } from '@nestjs/config';
import dbConfig from '@/config/database.config';
import { LoggerService } from '@/logger/services/logger.service';
import { Provider } from '@nestjs/common';

export const providers: Provider[] = [
    {
        provide: DB.KEY,

        useFactory: async (
            config: ConfigType<typeof dbConfig>
        ): Promise<MongoDbConnection> => {
            const connection = new MongoDb(config, new LoggerService());

            return await connection.make();
        },

        inject: [dbConfig.KEY, LoggerService],
    }
];

