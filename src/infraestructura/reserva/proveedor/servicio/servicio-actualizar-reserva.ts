import { RepositorioReserva } from 'src/dominio/reserva/puerto/repositorio/repositorio-reserva';
import { ServicioActualizarReserva } from 'src/dominio/reserva/servicio/servicio-actualizar-reserva';

export function servicioActualizarReservaProveedor(
  repositorioReserva: RepositorioReserva,
) {
  return new ServicioActualizarReserva(repositorioReserva);
}
