import { Injectable, NotFoundException } from '@nestjs/common';
import { ActividadEntity } from './entity/actividad.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from 'src/usuario/entity/usuario.entity';
import { CreateActividadDto } from './dto/create-actividad.dto';

@Injectable()
export class ActividadService {

    constructor(
        @InjectRepository(ActividadEntity)
        private readonly _actividadRepository: Repository<ActividadEntity>,

        @InjectRepository(UsuarioEntity)
        private readonly _usuarioRepository: Repository<UsuarioEntity>
    ) { }

    //Registrar una nueva actividad
    async registerActivity(createActividadDto: CreateActividadDto) {
        const usuario = await this._usuarioRepository.findOne({ where: { usuario_id: createActividadDto.usu_id } });


        if (!usuario) {
            throw new NotFoundException('Usuario no encontrado');
        }

        const actividad = this._actividadRepository.create({
            act_nombre: createActividadDto.act_nombre,
            act_descripcion: createActividadDto.act_descripcion,
            act_fecha: createActividadDto.act_fecha ? new Date(createActividadDto.act_fecha) : new Date(),
            usuario: usuario
        })

        return await this._actividadRepository.save(actividad);
    }

    //Obtener Actividades
    async getAllAcitivity(order: 'ASC' | 'DESC'): Promise<ActividadEntity[]>{
        return await this._actividadRepository
        .createQueryBuilder('actividad')
        .leftJoinAndSelect('actividad.usuario', 'usuario')
        //.addSelect(['usuario.usu_id', 'usuario.usu_nombre'])
        .orderBy('actividad.act_fecha', order)
        .getMany()
    }
}
