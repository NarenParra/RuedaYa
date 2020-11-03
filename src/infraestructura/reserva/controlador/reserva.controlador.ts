import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ComandoRegistrarReserva } from 'src/aplicacion/reserva/comado/registrar-reserva.comando';
import { ManejadorRegistrarReserva } from 'src/aplicacion/reserva/comado/registrar-reserva.manejador';
import { ManejadorListarReserva } from 'src/aplicacion/reserva/consulta/listar-reserva.manejador';

import { ReservaDto } from 'src/aplicacion/reserva/consulta/dto/reserva.dto';
import { ManejadorActualizarReserva } from 'src/aplicacion/reserva/comado/actualizar-reserva.manejador';
import { ManejadorEliminarReserva } from 'src/aplicacion/reserva/comado/eliminar-reserva.manejador';

@Controller('reservas')
export class ReservaCotrolador {
  constructor(
    private readonly _manejadorRegistrarReserva: ManejadorRegistrarReserva,
    private readonly _manejadorActualizarReserva: ManejadorActualizarReserva,
    private readonly _manejadorEliminarReserva: ManejadorEliminarReserva,
    private readonly _manejadorListarReserva: ManejadorListarReserva,
  ) {}

  @Get()
  async listar(): Promise<ReservaDto[]> {
    return this._manejadorListarReserva.ejecutar();
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async crear(@Body() comandoRegistrarReserva: ComandoRegistrarReserva) {
    await this._manejadorRegistrarReserva.ejecutar(comandoRegistrarReserva);
    return 'Reserva creada';
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async actualizar(
    @Param('id') id: number,
    @Body() comandoActualizarReserva: ComandoRegistrarReserva,
  ) {
    await this._manejadorActualizarReserva.ejecutar(
      comandoActualizarReserva,
      id,
    );
    return 'Reserva actualizada';
  }

  @Delete(':id')
  async eliminar(@Param('id') id: number) {
    await this._manejadorEliminarReserva.ejecutar(id);
    return 'Reserva eliminada';
  }
}
