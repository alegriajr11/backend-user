import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/usuario/dto/create-usuario.dto';
import { JwtAuthGuard } from './jwt-auth/jwt-auth.guard';
import { RolesGuard } from './jwt-auth/roles.guard';
import { Roles } from './decorator/roles.decorador';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService){}

    @UseGuards(JwtAuthGuard)
    @Post('register')
    async register(@Body() user: CreateUserDto){
        return this.authService.registerUser(user)
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto){
        const {usu_email, usu_password} = loginDto
        return this.authService.login(usu_email, usu_password)
    }
}
