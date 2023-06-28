import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@/database/database.module';
import { LoggerModule } from '@/logger/logger.module';
import { MailModule } from '@/mail/mail.module';
import { ConfigModule } from '@/config/config.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MailModule,
        LoggerModule,
        DatabaseModule,
    ],

    controllers: [AppController],

    providers: [AppService],
})
export class AppModule { }
