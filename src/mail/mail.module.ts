import { Module } from '@nestjs/common';
import { providers } from './providers/mail.provider';
import { MailService } from './services/mail.service';
import { ConfigModule } from '@nestjs/config';
import mailConfig from '../config/mail.config';

@Module({
    imports: [ConfigModule.forFeature(mailConfig)],
    providers: [...providers, MailService],
    exports: [...providers, MailService]
})
export class MailModule { }
