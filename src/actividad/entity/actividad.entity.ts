import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UsuarioEntity } from 'src/usuario/entity/usuario.entity';

@Entity({name: 'actividad'})
export class ActividadEntity {
    @PrimaryGeneratedColumn()
    act_id: number;

    @Column()
    act_nombre: string;

    @Column()
    act_descripcion: string;

    @Column()
    act_fecha: Date;

    @ManyToOne(() => UsuarioEntity, (usuario) => usuario.actividades)
    usuario: UsuarioEntity;
}