import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './entity/usuario.entity';
import { Repository } from 'typeorm';
import { RolEntity } from 'src/rol/entity/rol.entity';
import { CreateUserDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly _usuarioRepository: Repository<UsuarioEntity>,
        @InjectRepository(RolEntity)
        private readonly _rolRepository: Repository<RolEntity>
    ) { }

    //Crear usuario
    async createUser(userDto: CreateUserDto): Promise<{message: string}> {

        const rol = await this._rolRepository.findOne({ where: { rol_id: userDto.rol_id } });

        if (!rol) {
            return { message: 'Rol no encontrado' };
        }

        const usuario = this._usuarioRepository.create({
            usu_nombre: userDto.usu_nombre,
            usu_apellido: userDto.usu_apellido,
            usu_email: userDto.usu_email,
            usu_password: userDto.usu_password, //Hay que encriptar la contraseña
            rol: rol
        });

        await this._usuarioRepository.save(usuario);


        return {message: 'Usuario creado exitosamente'};
    }

    //Obtener todos los usuarios
    async getAllUsers(): Promise<UsuarioEntity[]> {
        return await this._usuarioRepository.createQueryBuilder('usuario')
            .innerJoin('usuario.rol', 'rol')
            .getMany();
    }

}
