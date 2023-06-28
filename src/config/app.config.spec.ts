import { ConfigModule, ConfigType } from '@nestjs/config';
import { TestingModule, Test } from '@nestjs/testing';
import appConfig from './app.config';

describe('AppConfig', () => {
    let config: ConfigType<typeof appConfig>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule.forFeature(appConfig)],
        }).compile();

        config = module.get<ConfigType<typeof appConfig>>(appConfig.KEY);
    });

    it('should be defined', () => {
        expect(appConfig).toBeDefined();
    });

    it('should contains uri key', async () => {
        expect(config.key).toBe(undefined);
        expect(config.port).toBe(3001);
    });
});
