import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RolEntity } from 'src/rol/entity/rol.entity';
import { CreateUserDto } from 'src/usuario/dto/create-usuario.dto';
import { UsuarioEntity } from 'src/usuario/entity/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'
import { ConfigService } from '@nestjs/config';
import { ActividadService } from 'src/actividad/actividad.service';
import { CreateActividadDto } from 'src/actividad/dto/create-actividad.dto';

@Injectable()
export class AuthService {

    constructor(
        //Servicio de JWT para generar y verificar tokens
        private readonly jwtService: JwtService,
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
        @InjectRepository(RolEntity)
        private readonly rolRepository: Repository<RolEntity>,
        private readonly configService: ConfigService,
        private readonly actividadServices: ActividadService
    ) { }

    async registerUser(userData: CreateUserDto) {
        //Generamos salt para mejorar la seguridad del hash de la contraseña
        const salt = await bcrypt.genSalt(10)

        //Hashear la contraseña del usuario con el salt generado
        const hashedPassword = await bcrypt.hash(userData.usu_password, salt)

        //Buscar el rol especificado en el Dto a la base de datos por ID
        const rol = await this.rolRepository.findOne({ where: { rol_id: userData.rol_id } })

        //Validar si el rol no existe, enviamos una excepcion con un mensaje de erro
        if (!rol) {
            throw new BadRequestException('El Rol especificado no existe')
        }

        const newUser = this.usuarioRepository.create({
            ...userData, //Copiamos todo el dto
            usu_password: hashedPassword,
            rol
        })

        await this.usuarioRepository.save(newUser)

        const actividadDto = new CreateActividadDto()
        actividadDto.act_nombre = 'Registro Usuario'
        actividadDto.act_descripcion = 'Usuario registrado en el sistema'
        actividadDto.usu_id = newUser.usuario_id
        actividadDto.act_fecha = new Date()

        await this.actividadServices.registerActivity(actividadDto)

        return 'Usuario Registrado Exitosamente'
    }

    async validateUser(usu_email: string, usu_password: string): Promise<any> {
        //Buscar el usuario por su email en la base de datos
        const user = await this.usuarioRepository.findOne({ where: { usu_email: usu_email }, relations: ['rol'] })

        if (user && await bcrypt.compare(usu_password, user.usu_password)) {
            //Extraer la contraseña del usuario y retornar los demas datos
            const { usu_password, ...result } = user
            return result
        }
        return null //Retornar null si no se encuentra el usuario o la contraseña es incorrecta
    }

    async generateToken(user: any): Promise<{ access_token: string }> {
        const payload = { usu_email: user.usu_email, sub: user.usuario_id, rol: user.rol.rol_nombre }
        const secret = this.configService.get<string>('JWT_SECRET') || 'fallback_secret_key_123456789'
        return { access_token: this.jwtService.sign(payload, { secret }) }
    }

    async login(usu_email: string, usu_password: string) {
        //Validar el usuario con el email y la contraseña proporcionados
        const user = await this.validateUser(usu_email, usu_password)
        if (!user) {
            throw new UnauthorizedException('Credenciales incorrectas')
        }

        if (!user.rol) {
            throw new BadRequestException('El usuario no tiene un rol asignado');
        }

        const actividadDto = new CreateActividadDto()
        actividadDto.act_nombre = 'Inicio de Sesion'
        actividadDto.act_descripcion = `El usuario ${user.usu_nombre} inicio sesion correctamente`
        actividadDto.usu_id = user.usuario_id
        actividadDto.act_fecha = new Date()

        await this.actividadServices.registerActivity(actividadDto)

        //Usar el método generateToken existente
        return await this.generateToken(user);
    }

}
