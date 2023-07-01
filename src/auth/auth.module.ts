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

@Module({
    imports: [
        UsersModule,
        ConfigModule.forRoot(),
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
