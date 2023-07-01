import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { LoggerService } from '../../logger/services/logger.service';
import { HealthService } from '../../health/services/health.service';

describe('AppService', () => {
    let logger: LoggerService;
    let service: AppService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [
                AppService,
                {
                    provide: HealthService,
                    useValue: {
                        constructor: jest.fn(),
                        new: jest.fn(),
                        check: jest.fn()
                    }
                },
                {
                    provide: 'LoggerServiceAppService',
                    useValue: {
                        constructor: jest.fn(),
                        new: jest.fn(),
                        log: jest.fn()
                    }
                }
            ],
        }).compile();

        service = app.get<AppService>(AppService);
        logger = app.get<LoggerService>('LoggerServiceAppService');
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should log ip of request', async () => {
        jest.spyOn(logger, 'log').mockImplementation((message: string) => {
            console.log(message);
        });

        const result = await service.getSystemStatus();

        expect(result).toEqual(undefined);
    });
});
