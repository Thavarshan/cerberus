import { ConfigModule, ConfigType } from '@nestjs/config';
import { TestingModule, Test } from '@nestjs/testing';
import { authConfig } from './auth.config';

describe('AuthConfig', () => {
    let config: ConfigType<typeof authConfig>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule.forFeature(authConfig)],
        }).compile();

        config = module.get<ConfigType<typeof authConfig>>(authConfig.KEY);
    });

    it('should be defined', () => {
        expect(authConfig).toBeDefined();
    });

    it('should contains expiresIn and secret key', async () => {
        expect(config.expiresIn).toBe('3600s');
        expect(config.secretKey).toBeDefined();
    });
});
