import { Module } from '@nestjs/common';
import { ActividadService } from './actividad.service';
import { ActividadController } from './actividad.controller';
import { UsuarioEntity } from 'src/usuario/entity/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadEntity } from './entity/actividad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity, ActividadEntity])],
  providers: [ActividadService],
  controllers: [ActividadController],
  exports:[ActividadService]
})
export class ActividadModule {}
