import * as moment from 'moment';

import { Reserva } from '../modelo/reserva';
import { RepositorioReserva } from '../puerto/repositorio/repositorio-reserva';

export class ServicioRegistrarReserva {
  constructor(private readonly _repositorioReserva: RepositorioReserva) {}

  async ejecutar(reserva: Reserva) {
    const precio: number = await this._repositorioReserva.saberPrecioCoche(
      reserva.coche,
    );

    if (precio) {
      const dias: number =
        moment(reserva.fechaFin).diff(reserva.fechaInicio, 'days') + 1;

      let precioTotal: number = precio[0].precio * dias;

      if (reserva.direccionUsuarioRecibe) {
        const porcentaje: number = precioTotal * 0.1;

        precioTotal = precioTotal + porcentaje;
      }

      await this._repositorioReserva.guardar(reserva, precioTotal);
    }
  }
}
