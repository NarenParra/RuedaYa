import { RepositorioReserva } from 'src/dominio/reserva/puerto/repositorio/repositorio-reserva';
import { ServicioEliminarReserva } from 'src/dominio/reserva/servicio/servicio-eliminar-reserva';

export function servicioEliminarReservaProveedor(
  repositorioReserva: RepositorioReserva,
) {
  return new ServicioEliminarReserva(repositorioReserva);
}
