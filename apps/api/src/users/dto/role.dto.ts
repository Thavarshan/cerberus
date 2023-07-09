import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsEnum
} from 'class-validator';
import { Role } from '../enums/role.enum';

export class RoleDto {
    @IsNotEmpty()
    @IsString()
    @IsEnum(Role)
    public readonly name: string;

    @IsOptional()
    @IsString()
    public slug?: string;

    @IsOptional()
    @IsString()
    public description?: string;
}
