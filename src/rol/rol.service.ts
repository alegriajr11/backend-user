import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolEntity } from './entity/rol.entity';
import { Repository } from 'typeorm';
import { CreateRolDto } from './dto/create-rol.dto';

@Injectable()
export class RolService {

    constructor(
        @InjectRepository(RolEntity)
        private readonly _rolRepository: Repository<RolEntity>
    ) { }

    async createRol(createRolDto: CreateRolDto): Promise<string> {
        const rol = this._rolRepository.create(createRolDto);
        await this._rolRepository.save(rol);

        return 'Rol creado exitosamente';
    }

    

}
