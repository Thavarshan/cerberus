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
import { MongoDb } from './mongodb.connection';
import { LoggerService } from '../../logger/services/logger.service';
import dbConfig from '../../config/database.config';

describe('Connection', () => {
    let connection: MongoDb;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [
                MongoDb,
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

        connection = app.get<MongoDb>(MongoDb);
    });

    it('should be defined', () => {
        expect(connection).toBeDefined();
    });

    it('should make mongodb connection', async () => {
        const instance = await connection.make();

        expect(instance).toBeInstanceOf(Object);
    });
});
