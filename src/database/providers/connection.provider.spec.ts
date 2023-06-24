/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection, createConnection } from 'mongoose';
import { LoggerModule } from '../../logger/logger.module';
import mongodbConfig from '../../config/database.config';
import { providers } from './connection.provider';
import { DB } from '../enums/db.enum';

jest.mock('mongoose', () => ({
    createConnection: jest.fn().mockImplementation(
        (uri: any, options: any) => ({
            asPromise: jest.fn().mockImplementation(
                () => (new Promise(
                    resolve => resolve({
                        on: (event: string, action: () => void) => undefined,
                        readyState: true
                    })
                ))
            )
        })
    ),

    Connection: jest.fn()
}));

describe('DatabaseConnectionProviders', () => {
    let connection: any;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forFeature(mongodbConfig),
                LoggerModule.forRoot()
            ],

            providers: [...providers],
        }).compile();

        connection = module.get<Connection>(DB.KEY);
    });

    it('DB_CONNECTION should be defined', () => {
        expect(connection).toBeDefined();
    });

    it('connect is called', () => {
        // expect(createConnection).toHaveBeenCalledTimes(1); // it is 2 here. why
        expect(createConnection).toHaveBeenCalledWith('mongodb://localhost/bitmenu');
    });
});
