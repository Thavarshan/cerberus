import { LoggerModule } from '@/logger/logger.module';
import { ConfigModule } from '@/config/config.module';
import dbConfig from '@/config/database.config';
import { Module } from '@nestjs/common';
// import { providers } from './providers/connection.provider';
import { defaultOrmModule } from './providers/orm.provider';

@Module({
    imports: [
        LoggerModule.forRoot(),
        ConfigModule.forFeature(dbConfig),
        defaultOrmModule(),
    ],

    // providers: [...providers],

    // exports: [...providers],
})
export class DatabaseModule { }
