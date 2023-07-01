import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { DatabaseModule } from '@/database/database.module';
import { LoggerModule } from '@/logger/logger.module';
import { MailModule } from '@/mail/mail.module';
import { ConfigModule } from '@/config/config.module';
import { UsersModule } from '@/users/users.module';
import { AuthModule } from '@/auth/auth.module';
import { HealthModule } from '@/health/health.module';

@Module({
    imports: [
        MailModule,
        UsersModule,
        AuthModule,
        DatabaseModule,
        HealthModule,
        LoggerModule.forRoot(),
        ConfigModule.forRoot({ isGlobal: true }),
    ],

    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
