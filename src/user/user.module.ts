import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { DatabaseModule } from '@/database/database.module';
import { providers } from './providers/user.provider';
import { UserRepository } from './repositories/user.repository';

@Module({
    imports: [
        DatabaseModule
    ],

    controllers: [UserController],

    providers: [
        UserService,
        UserRepository,
        ...providers
    ],

    exports: [
        UserService,
        UserRepository,
        ...providers
    ]
})
export class UserModule { }

