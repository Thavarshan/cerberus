import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from '../services/app.service';
import { HealthService } from '../../health/services/health.service';

describe('AppController', () => {
    let controller: AppController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [
                AppService,
                {
                    provide: 'LoggerServiceAppService',
                    useValue: {
                        log: jest.fn()
                    }
                },
                {
                    provide: HealthService,
                    useValue: {
                        constructor: jest.fn(),
                        new: jest.fn(),
                        check: jest.fn()
                    }
                }
            ],
        }).compile();

        controller = app.get<AppController>(AppController);
    });

    describe('root', () => {
        it('should return request IP', async () => {
            expect(await controller.getSystemStatus()).toBe(undefined);
        });
    });
});
