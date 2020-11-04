import * as moment from 'moment';
import { SinonStubbedInstance } from 'sinon';
import { Coche } from 'src/dominio/coche/modelo/coche';
import { Reserva } from 'src/dominio/reserva/modelo/reserva';
import { RepositorioReserva } from 'src/dominio/reserva/puerto/repositorio/repositorio-reserva';
import { ServicioRegistrarReserva } from 'src/dominio/reserva/servicio/servicio-registrar-reserva';
import { createStubObj } from 'test/util/create-object.stub';

describe('ServicioRegistrarReserva', () => {
  let servicioRegistrarReserva: ServicioRegistrarReserva;
  let repositorioReservaStub: SinonStubbedInstance<RepositorioReserva>;

  beforeEach(() => {
    repositorioReservaStub = createStubObj<RepositorioReserva>([
      'saberPrecioCoche',
      'actualizar',
      'eliminar',
      'guardar',
    ]);
    servicioRegistrarReserva = new ServicioRegistrarReserva(
      repositorioReservaStub,
    );
  });

  it('si existe un coche se puede registrar la reserva ', async () => {
    const nuevoCoche = new Coche(1, 'Mazda', '121', 'CDD-456', 45000);
    const reserva = new Reserva(
      new Date().toISOString(),
      moment()
        .add(7, 'days')
        .toISOString(),
      1234567,
      'direccion recibe',
      nuevoCoche,
      'nombre usuario',
      '1789456',
      'cedula',
      'Lorem@lorem.com',
      'direccion',
      '12345678',
    );
    await servicioRegistrarReserva.ejecutar(reserva);

    expect(repositorioReservaStub.saberPrecioCoche.getCalls().length).toBe(1);
  });
});
