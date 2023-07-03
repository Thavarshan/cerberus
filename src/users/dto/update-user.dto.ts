import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { UserDto } from './user.dto';

export class UpdateUserDto extends PartialType(UserDto) {
    @IsOptional()
    @IsString()
    public readonly id?: string;

    @IsOptional()
    @IsString()
    public readonly refreshToken?: string;
}
