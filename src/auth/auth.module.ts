import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/entity/usuario.entity';
import { RolEntity } from 'src/rol/entity/rol.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'fallback_secret_key_123456789',
        signOptions: { expiresIn: '30m' },
      }),
    }),
    TypeOrmModule.forFeature([UsuarioEntity, RolEntity])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtService]
})
export class AuthModule {}
