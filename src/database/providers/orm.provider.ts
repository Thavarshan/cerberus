import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@/config/config.module';
import { Driver } from '@/interfaces/database/driver.interface';

export function defaultOrmModule () {
    return TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        imports: [ConfigModule],
        useFactory: (config: ConfigService) => ({
            type: config.get<string>('DB_CONNECTION') as Driver,
            host: config.get<string>('database.host'),
            port: config.get<number>('database.port'),
            username: config.get<string>('database.user'),
            password: config.get<string>('database.password'),
            database: config.get<string>('database.database'),
            synchronize: true,
            logging: true,
        })
    });
}
