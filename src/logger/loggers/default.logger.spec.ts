import { Test, TestingModule } from '@nestjs/testing';
import { DefaultLogger } from './default.logger';

describe('Default Logger', () => {
    let provider: DefaultLogger;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [DefaultLogger],
        }).compile();

        provider = module.get<DefaultLogger>(DefaultLogger);
    });

    it('should be defined', () => {
        expect(provider).toBeDefined();
    });
});
