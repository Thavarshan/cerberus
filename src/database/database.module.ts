import { LoggerModule } from '@/logger/logger.module';
import { Config as ConfigModule } from '@/config/config.module';
import dbConfig from '@/config/database.config';
import { Module } from '@nestjs/common';
import connectionProvider from './providers/connection.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        LoggerModule.forRoot(),
        ConfigModule.forFeature(dbConfig),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                uri: config.get<string>('DB_URI')
            }),
        })
    ],

    providers: [...connectionProvider],

    exports: [...connectionProvider],
})
export class DatabaseModule { }
