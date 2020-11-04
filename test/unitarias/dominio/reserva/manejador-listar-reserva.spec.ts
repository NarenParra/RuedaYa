import { SinonStubbedInstance } from 'sinon';
import { ManejadorListarReserva } from 'src/aplicacion/reserva/consulta/listar-reserva.manejador';
import { DaoReserva } from 'src/dominio/reserva/puerto/dao/dao-reserva';
import { DaoReservaMysql } from 'src/infraestructura/reserva/adaptador/dao/dao-reserva-mysql';
import { createStubObj } from 'test/util/create-object.stub';

describe('manejadorListarReserva', () => {
  let DaoReservaStub: SinonStubbedInstance<DaoReserva>;
  let manejadorListarReserva: ManejadorListarReserva;

  beforeEach(() => {
    DaoReservaStub = createStubObj<DaoReserva>(['listar']);
    manejadorListarReserva = new ManejadorListarReserva(DaoReservaStub);
  });

  it('listar las reservas ', async () => {
    await manejadorListarReserva.ejecutar();

    expect(DaoReservaStub.listar.getCalls().length).toBe(1);
  });
});

describe('manejadorListarReserva', () => {
  let DaoReservaMysqlStub: SinonStubbedInstance<DaoReservaMysql>;
  let manejadorListarReserva: ManejadorListarReserva;

  beforeEach(() => {
    DaoReservaMysqlStub = createStubObj<DaoReserva>(['listar']);
    manejadorListarReserva = new ManejadorListarReserva(DaoReservaMysqlStub);
  });

  it('listar las reservas ', async () => {
    await manejadorListarReserva.ejecutar();

    expect(DaoReservaMysqlStub.listar.getCalls().length).toBe(1);
  });
});
