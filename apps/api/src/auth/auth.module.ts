import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './controllers/auth.controller';
import { JwtGuard } from './guards/jwt.guard';
import { AuthService } from './services/auth.service';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { RegisterController } from './controllers/register.controller';
import { RegisterService } from './services/register.service';
import { authConfig } from '@/config/auth.config';
import { RefreshSession } from './entities/refresh-session.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshSessionService } from './services/refresh-session.service';

@Module({
    imports: [
        UsersModule,
        ConfigModule.forFeature(authConfig),
        TypeOrmModule.forFeature([RefreshSession]),
        JwtModule.registerAsync({
            inject: [authConfig.KEY],
            imports: [ConfigModule.forFeature(authConfig)],
            useFactory: (config: ConfigType<typeof authConfig>) => {
                return {
                    secret: config.secretKey,
                    signOptions: { expiresIn: config.expiresIn },
                } as JwtModuleOptions;
            }
        }),
    ],
    providers: [
        RegisterService,
        RefreshSessionService,
        AuthService,
        {
            provide: APP_GUARD,
            useClass: JwtGuard,
        },
    ],
    controllers: [AuthController, RegisterController],
    exports: [AuthService, RegisterService],
})
export class AuthModule { }
