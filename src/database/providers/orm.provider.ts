import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { entities } from './entities.manifest';
import { DynamicModule, Module } from '@nestjs/common';

@Module({})
export class OrmModule {
    /**
     * This is a factory function that returns a DynamicModule.
     *
     * @returns {DynamicModule}
     */
    public static forRoot (): DynamicModule {
        return TypeOrmModule.forRootAsync({
            useFactory: () => OrmModule.configureOrm(),
        });
    }

    /**
     * Configure options for the TypeORM module.
     *
     * @param {object} overrides
     *
     * @returns {TypeOrmModuleOptions}
     */
    protected static configureOrm (
        overrides: { [key: string]: any; } = {}
    ): TypeOrmModuleOptions {
        let connectionConfig: { [key: string]: any; };
        const url = process.env.DB_URL;

        if (url && url !== '') {
            connectionConfig = { url };
        } else {
            connectionConfig = {
                port: process.env.DB_PORT || 3306,
                username: process.env.DB_USERNAME || 'root',
                password: process.env.DB_PASSWORD || '',
                database: process.env.DB_DATABASE || 'cerberus',
            };
        }

        return {
            ...connectionConfig, ...{
                type: process.env.DB_CONNECTION || 'mysql',
                synchronize: false,
                logging: false,
                entities,
                ssl: {
                    rejectUnauthorized: true
                },
            }, ...overrides
        } as TypeOrmModuleOptions;
    }
}
