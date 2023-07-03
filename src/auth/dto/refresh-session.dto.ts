import { User } from '@/users/entities/user.entity';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class RefreshSessionDto {
    @IsNotEmpty()
    @IsString()
    public readonly user: Partial<User>;

    @IsNotEmpty()
    @IsString()
    public readonly refreshToken: string;

    @IsNotEmpty()
    @IsDate()
    public readonly expiresIn: number | string;

    @IsNotEmpty()
    @IsString()
    public readonly createdAt: number;
}
