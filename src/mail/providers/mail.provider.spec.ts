import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from '@sendgrid/mail';
import mailConfig from '../../config/mail.config';
import { Mail } from '../enums/mail.enum';
import { providers } from './mail.provider';

describe('MailProviders', () => {
    let provider: MailService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule.forFeature(mailConfig)],
            providers: [...providers],
        }).compile();

        provider = module.get<MailService>(Mail.KEY);
    });

    it('should be defined', () => {
        expect(provider).toBeDefined();
    });
});
