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
import { RolesService } from '../services/roles.service';
import { Role } from '@/interfaces/users/role.entity';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { CreateRoleDto } from '../dto/create-role.dto';

@Controller('roles')
export class RolesController {
    /**
     * Create new RolesController instance.
     *
     * @param {RolesService} service
     *
     * @returns {void}
     */
    constructor (protected readonly service: RolesService) { }

    /**
     * Create new user and persist to database.
     *
     * @param {CreateRoleDto} dto
     *
     * @returns {Promise<Role>}
     */
    @HttpCode(HttpStatus.CREATED)
    @Post()
    public async create (@Body() dto: CreateRoleDto): Promise<Role> {
        return this.service.create(dto);
    }

    @Get()
    public async findAll (): Promise<{ [key: string]: Role[]; }> {
        const data = await this.service.findAll();

        return { data };
    }

    @Get(':id')
    public async findOne (@Param('id') id: number): Promise<Role> {
        return await this.service.findOne(id);
    }

    @Patch(':id')
    public async update (
        @Param('id') id: number,
        @Body() dto: UpdateRoleDto
    ): Promise<Role> {
        return await this.service.update(id, dto);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    public async delete (@Param('id') id: number): Promise<void> {
        await this.service.delete(id);
    }
}
