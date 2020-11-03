import { Injectable } from '@nestjs/common';
import { Reserva } from 'src/dominio/reserva/modelo/reserva';
import { ServicioActualizarReserva } from 'src/dominio/reserva/servicio/servicio-actualizar-reserva';
import { ComandoRegistrarReserva } from './registrar-reserva.comando';

@Injectable()
export class ManejadorActualizarReserva {
  constructor(private _servicioActualizarReserva: ServicioActualizarReserva) {}

  async ejecutar(
    comandoActualizarReserva: ComandoRegistrarReserva,
    id: number,
  ) {
    await this._servicioActualizarReserva.ejecutar(
      new Reserva(
        comandoActualizarReserva.fechaInicio,
        comandoActualizarReserva.fechaFin,
        comandoActualizarReserva.precioTotal,
        comandoActualizarReserva.direccionUsuarioRecibe,
        comandoActualizarReserva.coche,
        //usuario
        comandoActualizarReserva.documento,
        comandoActualizarReserva.nombre,
        comandoActualizarReserva.email,
        comandoActualizarReserva.direccion,
        comandoActualizarReserva.telefono,
        comandoActualizarReserva.tipoDocumento,
      ),
      id,
    );
  }
}
