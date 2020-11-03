import { Coche } from 'src/dominio/coche/modelo/coche';
import { Reserva } from '../../modelo/reserva';

export abstract class RepositorioReserva {
  //preguntar si existe el usuario (documento) si no guardar
  abstract async guardar(reserva: Reserva);
  abstract async actualizar(reserva: Reserva, id: number);
  abstract async eliminar(id: number);
}
