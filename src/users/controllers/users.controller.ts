import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    // UseGuards,
    HttpCode,
    HttpStatus
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '@/interfaces/users/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('users')
export class UsersController {
    /**
     * Create new UsersController instance.
     *
     * @param {UsersService} service
     *
     * @returns {void}
     */
    constructor (protected readonly service: UsersService) { }

    /**
     * Create new user and persist to database.
     *
     * @param {CreateUserDto} dto
     *
     * @returns {Promise<User>}
     */
    @HttpCode(HttpStatus.CREATED)
    @Post()
    public async create (@Body() dto: CreateUserDto): Promise<User> {
        return this.service.create(dto);
    }

    @Get()
    public async findAll (): Promise<{ [key: string]: User[]; }> {
        const data = await this.service.findAll();

        return { data };
    }

    @Get(':id')
    public async findOne (@Param('id') id: string): Promise<User> {
        return await this.service.findOne(id);
    }

    @Patch(':id')
    public async update (
        @Param('id') id: string,
        @Body() dto: UpdateUserDto
    ): Promise<User> {
        return await this.service.update(id, dto);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    public async delete (@Param('id') id: string): Promise<void> {
        await this.service.delete(id);
    }
}
