import { RepositorioReserva } from 'src/dominio/reserva/puerto/repositorio/repositorio-reserva';
import { RepositorioReservaMysql } from 'src/infraestructura/reserva/adaptador/repositorio/repositorio-reserva-mysql';
import { repositorioReservaProvider } from 'src/infraestructura/reserva/proveedor/repositorio/repositorio-reserva';

describe('RepositorioReservaProvider', () => {
  const data = {
    provide: RepositorioReserva,
    useClass: RepositorioReservaMysql,
  };
  test('test RepositorioReservaProvider', () => {
    expect(repositorioReservaProvider).toEqual(data);
  });
});
