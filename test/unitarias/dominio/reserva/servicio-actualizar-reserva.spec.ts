import * as moment from 'moment';
import { SinonStubbedInstance } from 'sinon';
import { RepositorioReserva } from 'src/dominio/reserva/puerto/repositorio/repositorio-reserva';
import { ServicioActualizarReserva } from 'src/dominio/reserva/servicio/servicio-actualizar-reserva';
import { createStubObj } from 'test/util/create-object.stub';
import { Reserva } from 'src/dominio/reserva/modelo/reserva';
import { Coche } from 'src/dominio/coche/modelo/coche';

describe('ServicioActualizarReserva', () => {
  let servicioActualizarReserva: ServicioActualizarReserva;
  let repositorioReservaStub: SinonStubbedInstance<RepositorioReserva>;

  beforeEach(() => {
    repositorioReservaStub = createStubObj<RepositorioReserva>([
      'saberPrecioCoche',
      'actualizar',
      'eliminar',
      'guardar',
    ]);
    servicioActualizarReserva = new ServicioActualizarReserva(
      repositorioReservaStub,
    );
  });

  it('si existe um coche y un id de reserva, se puede actualizar la reserva ', async () => {
    const nuevoCoche = new Coche(1, 'Mazda', '121', 'CDD-456', 45000);
    const id = 1;
    const reserva = new Reserva(
      moment()
        .add(4, 'days')
        .toISOString(),
      moment()
        .add(7, 'days')
        .toISOString(),
      1234567,
      'direccion recibe',
      nuevoCoche,
      'nombre usuario',
      '4564646546',
      'cedula',
      'Lorem@lorem.com',
      'direccion',
      '12345678',
    );
    await servicioActualizarReserva.ejecutar(reserva, id);

    expect(repositorioReservaStub.actualizar.getCalls().length).toBe(1);
  });
});
