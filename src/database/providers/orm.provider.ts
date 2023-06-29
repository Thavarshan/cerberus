import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@/config/config.module';
import { Driver } from '@/interfaces/database/driver.interface';
import { entities } from './entities.manifest';
import { DynamicModule } from '@nestjs/common';

export class OrmModule {
    /**
     * This is a factory function that returns a DynamicModule.
     *
     * @returns {DynamicModule}
     */
    static forRoot (): DynamicModule {
        return TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => ({
                type: config.get<string>('DB_CONNECTION') as Driver,
                host: config.get<string>('DB_HOST'),
                port: config.get<number>('DB_PORT'),
                username: config.get<string>('DB_USERNAME'),
                password: config.get<string>('password'),
                database: config.get<string>('DB_DATABASE'),
                entities,
                synchronize: true,
                logging: false,
            })
        });
    }
}
