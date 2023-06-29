import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional } from 'class-validator';
import { UserDto } from './user.dto';

export class UpdateUserDto extends PartialType(UserDto) {
    @IsOptional()
    @IsNumber()
    id?: number;
}
