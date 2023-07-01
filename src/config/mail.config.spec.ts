import { ConfigModule, ConfigType } from '@nestjs/config';
import { TestingModule, Test } from '@nestjs/testing';
import { mailConfig } from './mail.config';

describe('MailConfig', () => {
    let config: ConfigType<typeof mailConfig>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule.forFeature(mailConfig)],
        }).compile();

        config = module.get<ConfigType<typeof mailConfig>>(mailConfig.KEY);
    });

    it('should be defined', () => {
        expect(mailConfig).toBeDefined();
    });

    it('should contains expiresIn and secret key', async () => {
        expect(config.apiKey).toBeTruthy();
    });
});
