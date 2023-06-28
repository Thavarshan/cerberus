/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule } from '../../logger/logger.module';
import dbConfig from '../../config/database.config';
import { providers } from './connection.provider';
import { DB } from '../enums/db.enum';
import * as iconv from 'iconv-lite';
import { createConnection } from 'mysql2';

iconv.encodingExists('foo');

// Becuase, MySQL is the default database for this project, we mock the mysql2 module.
jest.mock('mysql2', () => ({
    createConnection: jest.fn().mockImplementation(
        (options: any) => ({
            on: (event: string, action: () => void) => undefined,
        })
    ),

    Connection: jest.fn()
}));

describe('DatabaseConnectionProviders', () => {
    let connection: any;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forFeature(dbConfig),
                LoggerModule.forRoot()
            ],

            providers: [...providers],
        }).compile();

        connection = module.get<DB.KEY>(DB.KEY);
    });

    it('DB_CONNECTION should be defined', () => {
        expect(connection).toBeDefined();
    });

    it('make is called', () => {
        expect(createConnection).toHaveBeenCalledTimes(2);
    });
});


