import { LoggerModule } from '@/logger/logger.module';
import { ConfigModule } from '@/config/config.module';
import { dbConfig } from '@/config/database.config';
import { Module } from '@nestjs/common';
import { OrmModule } from './providers/orm.provider';

@Module({
    imports: [
        LoggerModule.forRoot(),
        ConfigModule.forFeature(dbConfig),
        OrmModule.forRoot(),
    ],
})
export class DatabaseModule { }
