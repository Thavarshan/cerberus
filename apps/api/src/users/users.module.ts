import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersRepository } from './repositories/users.repository';
import { RefreshSession } from '@/auth/entities/refresh-session.entity';
import { Role } from './entities/role.entity';
import { RolesService } from './services/roles.service';
import { RolesRepository } from './repositories/roles.repository';

@Module({
    imports: [TypeOrmModule.forFeature([
        User,
        Role,
        RefreshSession
    ])],
    exports: [TypeOrmModule, UsersService, RolesService],
    providers: [
        UsersService,
        UsersRepository,
        RolesService,
        RolesRepository
    ],
    controllers: [UsersController],
})
export class UsersModule { }
