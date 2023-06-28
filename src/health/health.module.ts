import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from '@/config/config.module';
import { ConfigService } from '@nestjs/config';
import dbConfig from '@/config/database.config';
import HealthService from './services/health.service';

@Module({
    imports: [
        TerminusModule,
        ConfigModule.forFeature(dbConfig),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                uri: config.get<string>('DB_URI')
            }),
        })
    ],

    providers: [HealthService],

    exports: [HealthService]
})
export default class HealthModule { }
