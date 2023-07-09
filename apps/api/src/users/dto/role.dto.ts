import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsEnum
} from 'class-validator';
import { Roles } from '../enums/roles.enum';

export class RoleDto {
    @IsNotEmpty()
    @IsString()
    @IsEnum(Roles)
    public readonly name: string;

    @IsOptional()
    @IsString()
    public slug?: string;

    @IsOptional()
    @IsString()
    public description?: string;
}
