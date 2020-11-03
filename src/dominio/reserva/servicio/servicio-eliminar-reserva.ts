import { RepositorioReserva } from '../puerto/repositorio/repositorio-reserva';

export class ServicioEliminarReserva {
  constructor(private readonly _repositorioReserva: RepositorioReserva) {}

  async ejecutar(id: number) {
    await this._repositorioReserva.eliminar(id);
  }
}
