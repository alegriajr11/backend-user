import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

export class RolesGuard implements CanActivate { // Definimos el guard RolesGuard que implementa CanActivate
    constructor(private reflector: Reflector) { } //Inyectar el reflector para obtener los metadatos de los roles

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!requiredRoles) {
            return true; // Si no hay roles requeridos, permitir el acceso
        }

        //Obtiene el usuario del request
        const { user } = context.switchToHttp().getRequest();

        if (!user || !user.roles) {
            throw new UnauthorizedException('No tienes permisos para acceder a este recurso');
        }

        if (!requiredRoles.includes(user.roles)) {
            throw new UnauthorizedException('No tienes permisos para acceder a este recurso')
        }
        return true; // Permitir el acceso si el usuario tiene uno de los roles requeridos
    }
}
