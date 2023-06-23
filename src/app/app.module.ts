import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from '@/health/health.module';
import { TerminusModule } from '@nestjs/terminus';
import { DatabaseModule } from '@/database/database.module';
import { MailModule } from '@/mail/mail.module';

@Module({
    imports: [
        DatabaseModule,
        ConfigModule,
        MailModule,
        HealthModule,
        TerminusModule,
        ConfigModule.forRoot({ isGlobal: true })
    ],

    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    //
}
