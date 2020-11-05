import { DaoReserva } from 'src/dominio/reserva/puerto/dao/dao-reserva';
import { DaoReservaMysql } from 'src/infraestructura/reserva/adaptador/dao/dao-reserva-mysql';
import { daoReservaProvider } from 'src/infraestructura/reserva/proveedor/dao/dao-resrva.proveedor';

describe('daoReservaProvider', () => {
  const data = {
    provide: DaoReserva,
    useClass: DaoReservaMysql,
  };
  test('test daoReservaProvider', () => {
    expect(daoReservaProvider).toEqual(data);
  });
});
