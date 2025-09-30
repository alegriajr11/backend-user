import { Controller, Get, Query } from '@nestjs/common';
import { ActividadService } from './actividad.service';

@Controller('actividad')
export class ActividadController {

    constructor(
        private readonly actividadService: ActividadService
    ){}

    @Get()
    async getAllActivity(@Query('order') order: 'ASC' | 'DESC' ){
        return this.actividadService.getAllAcitivity(order)
    }
}
