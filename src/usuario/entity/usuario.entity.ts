import { RolEntity } from "src/rol/entity/rol.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'usuario'})
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    usuario_id: number;

    @Column({type: 'varchar', length: 50, unique: false, nullable: false})
    usu_nombre: string;

    @Column({type: 'varchar', length: 50, unique: false, nullable: false})
    usu_apellido: string;

    @Column({type: 'varchar', length: 100, unique: true, nullable: false})
    usu_email: string;

    @Column()
    usu_password: string;

    @ManyToOne(  () => RolEntity, (rol) => rol.usuarios)
    @JoinColumn({name: 'rol_id'})
    rol: RolEntity;
}
