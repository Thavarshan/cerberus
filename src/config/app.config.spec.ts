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

    it('should contain basic configs', async () => {
        expect(config.name).toBe('Cerberus');
        expect(config.key).toBeUndefined();
        expect(config.port).toBeDefined();
    });
});
