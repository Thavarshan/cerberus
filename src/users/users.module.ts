import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersRepository } from './repositories/users.repository';
import { RefreshSession } from '@/auth/entities/refresh-session.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, RefreshSession])],
    exports: [TypeOrmModule, UsersService],
    providers: [
        UsersService,
        UsersRepository,
    ],
    controllers: [UsersController],
})
export class UsersModule { }
