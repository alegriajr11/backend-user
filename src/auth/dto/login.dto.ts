import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    usu_email: string;

    @IsString()
    @IsNotEmpty()
    usu_password: string;
}
