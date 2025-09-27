import { SetMetadata } from "@nestjs/common";

//Definimos el decorador Roles que recibe una lista de roles y los asigna a los metadatos de la ruta
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
//Este decorador se utiliza para asignar roles a las rutas de los controladores