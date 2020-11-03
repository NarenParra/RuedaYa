import { Coche } from 'src/dominio/coche/modelo/coche';
import { Reserva } from '../../modelo/reserva';

export abstract class RepositorioReserva {
  abstract async saberPrecioCoche(id: Coche): Promise<number>;
  abstract async guardar(reserva: Reserva, precio: number);
  abstract async actualizar(reserva: Reserva, id: number);
  abstract async eliminar(id: number);
}
