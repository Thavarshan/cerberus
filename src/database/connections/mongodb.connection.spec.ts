/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection, createConnection } from 'mongoose';
import { LoggerModule } from '../../logger/logger.module';
import dbConfig from '../../config/database.config';
import { MongoDb } from './mongodb.connection';

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
                ConfigModule.forFeature(dbConfig),
                LoggerModule.forRoot()
            ],

            providers: [MongoDb],
        }).compile();

        connection = module.get<MongoDb>(MongoDb);
    });

    it('DB_CONNECTION should be defined', () => {
        expect(connection).toBeDefined();
    });

    it('createConnection is called', async () => {
        await connection.make();

        expect(createConnection).toHaveBeenCalledTimes(1);
        expect(createConnection).toHaveBeenCalledWith('mongodb://localhost/cerberus');
    });
});
