import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './entity/usuario.entity';
import { RolEntity } from 'src/rol/entity/rol.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity, RolEntity])],
  controllers: [UsuarioController],
  providers: [UsuarioService]
})
export class UsuarioModule {}
