import { IsEmail, IsNotEmpty, Min, MinLength } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    usu_nombre: string;

    @IsNotEmpty()
    usu_apellido: string

    @IsEmail()
    usu_email: string;

    @IsNotEmpty()
    @MinLength(6)
    usu_password: string;

    @IsNotEmpty()
    rol_id: number;
}