import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersRepository } from './repositories/users.repository';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    exports: [TypeOrmModule, UsersService],
    providers: [
        UsersService,
        UsersRepository,
    ],
    controllers: [UsersController],
})
export class UsersModule { }
