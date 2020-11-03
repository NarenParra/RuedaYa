import { number } from '@hapi/joi';
import { Reserva } from '../modelo/reserva';
import { RepositorioReserva } from '../puerto/repositorio/repositorio-reserva';

export class ServicioActualizarReserva {
  constructor(private readonly _repositorioReserva: RepositorioReserva) {}

  async ejecutar(reserva: Reserva, id: number) {
    await this._repositorioReserva.actualizar(reserva, id);
  }
}
