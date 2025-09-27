import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUserDto } from './dto/create-usuario.dto';

@Controller('usuario')
export class UsuarioController {

    constructor(
        private readonly _usuarioService: UsuarioService
    ){}

    @Post()
    async createUser(@Body() dto: CreateUserDto) {
        return await this._usuarioService.createUser(dto);
    }

    @Get()
    async getAllUsers() {
        return await this._usuarioService.getAllUsers();
    }
}
