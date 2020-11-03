import { Injectable } from '@nestjs/common';
import { Reserva } from 'src/dominio/reserva/modelo/reserva';
import { ServicioRegistrarReserva } from 'src/dominio/reserva/servicio/servicio-registrar-reserva';
import { ComandoRegistrarReserva } from './registrar-reserva.comando';

@Injectable()
export class ManejadorRegistrarReserva {
  constructor(private _servicioRegistrarReserva: ServicioRegistrarReserva) {}

  async ejecutar(comandoRegistrarReserva: ComandoRegistrarReserva) {
    await this._servicioRegistrarReserva.ejecutar(
      new Reserva(
        comandoRegistrarReserva.fechaInicio,
        comandoRegistrarReserva.fechaFin,
        comandoRegistrarReserva.precioTotal,
        comandoRegistrarReserva.direccionUsuarioRecibe,
        comandoRegistrarReserva.coche,
        //usuario
        comandoRegistrarReserva.documento,
        comandoRegistrarReserva.nombre,
        comandoRegistrarReserva.email,
        comandoRegistrarReserva.direccion,
        comandoRegistrarReserva.telefono,
        comandoRegistrarReserva.tipoDocumento,
      ),
    );
  }
}
