import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { RoleDto } from './role.dto';

export class UpdateRoleDto extends PartialType(RoleDto) {
    @IsOptional()
    @IsString()
    public readonly id?: number;
}
