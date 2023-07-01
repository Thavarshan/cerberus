import { ConfigModule, ConfigType } from '@nestjs/config';
import { TestingModule, Test } from '@nestjs/testing';
import { dbConfig } from './database.config';

describe('DbConfig', () => {
    let config: ConfigType<typeof dbConfig>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule.forFeature(dbConfig)],
        }).compile();

        config = module.get<ConfigType<typeof dbConfig>>(dbConfig.KEY);
    });

    it('should be defined', () => {
        expect(dbConfig).toBeDefined();
    });

    it('should contain default configurations', async () => {
        expect(config.defaults.connection).toBe('mysql');
    });
});
