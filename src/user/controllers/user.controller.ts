import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    HttpStatus
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '@/interfaces/user/user';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
export class UserController {
    /**
     * Create new user controller instance.
     *
     * @param {UserService} service
     *
     * @returns {void}
     */
    constructor (protected readonly service: UserService) { }

    /**
     * Create a new user.
     *
     * @param {CreateUserDto} dto
     *
     * @returns {Promise<User>}
     */
    @HttpCode(HttpStatus.CREATED)
    @Post()
    public async create (@Body() dto: CreateUserDto): Promise<User> {
        return await this.service.create(dto);
    }

    /**
     * Find all users.
     *
     * @returns {Promise<User[]>}
     */
    @HttpCode(HttpStatus.OK)
    @Get()
    public async findAll (): Promise<User[]> {
        return await this.service.findAll();
    }

    /**
     * Find one user by id.
     *
     * @param {string} id
     *
     * @returns {Promise<User>}
     */
    @HttpCode(HttpStatus.OK)
    @Get(':id')
    public async findOne (@Param('id') id: string): Promise<User> {
        return await this.service.findOne(id);
    }

    /**
     * Update a user.
     *
     * @param {string} id
     * @param {UpdateUserDto} dto
     *
     * @returns {Promise<User>}
     */
    @HttpCode(HttpStatus.OK)
    @Patch(':id')
    public async update (
        @Param('id') id: string,
        @Body() dto: UpdateUserDto
    ): Promise<User> {
        return await this.service.update(id, dto);
    }

    /**
     * Delete a user.
     *
     * @param {string} id
     *
     * @returns {Promise<void>}
     */
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    public async delete (@Param('id') id: string): Promise<void> {
        await this.service.delete(id);
    }
}
