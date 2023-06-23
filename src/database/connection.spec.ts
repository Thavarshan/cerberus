/* eslint-disable @typescript-eslint/no-unused-vars */
jest.mock('mongoose', () => ({
    createConnection: jest.fn().mockImplementation(
        (uri: any, options: any) => ({
            asPromise: jest.fn()
                .mockImplementation(() => (new Promise(
                    resolve => resolve({
                        on: (event: string, action: () => void) => undefined,
                        readyState: true
                    })
                )))
        })
    ),

    Connection: jest.fn()
}));

import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from './connection';
import { Connection as MongoDdConnection } from 'mongoose';
import { LoggerService } from '../logger/services/logger.service';
import dbConfig from '../config/database.config';

describe('Connection', () => {
    let connection: Connection;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [
                Connection,
                {
                    provide: dbConfig.KEY,
                    useValue: {
                        new: jest.fn().mockResolvedValue(dbConfig),
                        constructor: jest.fn().mockResolvedValue(dbConfig),
                        uri: 'http://localhost/mongo_db'
                    }
                },
                {
                    provide: 'LoggerServiceDatabaseConnection',
                    useValue: new LoggerService()
                }
            ]
        }).compile();

        connection = app.get<Connection>(Connection);
    });

    it('should be defined', () => {
        expect(connection).toBeDefined();
    });

    it('should make mongodb connection', async () => {
        const instance = await connection.make();

        expect(instance).toBeInstanceOf(Object);
    });
});
