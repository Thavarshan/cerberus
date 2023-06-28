/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule } from '../../logger/logger.module';
import dbConfig from '../../config/database.config';
import * as iconv from 'iconv-lite';
import { createConnection } from 'mysql2';
import { MySQL } from './mysql.connection';

iconv.encodingExists('foo');

jest.mock('mysql2', () => ({
    createConnection: jest.fn().mockImplementation(
        (options: any) => ({
            on: (event: string, action: () => void) => undefined,
        })
    ),

    Connection: jest.fn()
}));

describe('MySQLConnection', () => {
    let connection: MySQL;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forFeature(dbConfig),
                LoggerModule.forRoot()
            ],

            providers: [MySQL],
        }).compile();

        connection = module.get<MySQL>(MySQL);
    });

    it('DB_CONNECTION should be defined', () => {
        expect(connection).toBeDefined();
    });

    it('createConnection is called', async () => {
        await connection.make();

        expect(createConnection).toHaveBeenCalledTimes(1);
    });
});
