import {
    IsEmail,
    IsString,
    IsNotEmpty,
    IsOptional,
    Matches,
    MaxLength,
    MinLength,
    IsBoolean
} from 'class-validator';

export class UserDto {
    @IsNotEmpty()
    @IsString()
    public readonly name: string;

    @IsOptional()
    @IsString()
    public readonly username?: string;

    @IsNotEmpty()
    @IsEmail()
    @Matches(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i, { message: 'Email format is invalid' })
    public readonly email: string;

    @IsNotEmpty()
    @MinLength(8, { message: 'The min length of password is 8' })
    @MaxLength(20, { message: 'The password can\'t accept more than 20 characters' })
    // @Matches(
    //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,20}$/,
    //     { message: 'A password at least contains one numeric digit, one supercase char and one lowercase char' }
    // )
    public readonly password: string;

    @IsOptional()
    @IsString()
    @MinLength(11)
    @MaxLength(1024)
    public readonly phone?: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(1024)
    public readonly role?: string;

    @IsOptional()
    @IsBoolean()
    public readonly verified?: boolean;

    @IsNotEmpty()
    @IsString()
    public readonly team: string;
}
