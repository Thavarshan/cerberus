import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from '@/health/health.module';
import { TerminusModule } from '@nestjs/terminus';
import { DatabaseModule } from '@/database/database.module';
import { MailModule } from '@/mail/mail.module';
import { HealthService } from '@/health/services/health.service';
import { LoggerModule } from '@/logger/logger.module';
import { UserModule } from '@/user/user.module';

@Module({
    imports: [
        DatabaseModule,
        MailModule,
        HealthModule,
        TerminusModule,
        LoggerModule.forRoot(),
        ConfigModule.forRoot({ isGlobal: true }),
        UserModule
    ],

    controllers: [AppController],
    providers: [AppService, HealthService],
})
export class AppModule {
    //
}
