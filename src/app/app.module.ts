import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@/database/database.module';
import { LoggerModule } from '@/logger/logger.module';
import { MailModule } from '@/mail/mail.module';
import { ConfigModule } from '@/config/config.module';
import { UsersModule } from '@/users/users.module';
// import { AuthModule } from '@/auth/auth.module';

@Module({
    imports: [
        LoggerModule.forRoot(),
        ConfigModule.forRoot({ isGlobal: true }),
        MailModule,
        DatabaseModule,
        UsersModule,
        // AuthModule
    ],

    controllers: [AppController],

    providers: [AppService],
})
export class AppModule { }
