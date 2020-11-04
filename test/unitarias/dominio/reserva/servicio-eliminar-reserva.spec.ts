import { SinonStubbedInstance } from 'sinon';
import { Coche } from 'src/dominio/coche/modelo/coche';
import { RepositorioReserva } from 'src/dominio/reserva/puerto/repositorio/repositorio-reserva';
import { ServicioEliminarReserva } from 'src/dominio/reserva/servicio/servicio-eliminar-reserva';
import { createStubObj } from 'test/util/create-object.stub';

describe('ServicioActualizarReserva', () => {
  let servicioEliminarReserva: ServicioEliminarReserva;
  let repositorioReservaStub: SinonStubbedInstance<RepositorioReserva>;

  beforeEach(() => {
    repositorioReservaStub = createStubObj<RepositorioReserva>([
      'saberPrecioCoche',
      'actualizar',
      'eliminar',
      'guardar',
    ]);
    servicioEliminarReserva = new ServicioEliminarReserva(
      repositorioReservaStub,
    );
  });

  it('si existe um coche se puede eliminar la reserva ', async () => {
    const nuevoCoche = new Coche(1, 'Mazda', '121', 'CDD-456', 45000);

    await servicioEliminarReserva.ejecutar(nuevoCoche.id);
    console.log(repositorioReservaStub.eliminar.getCalls().length);

    expect(repositorioReservaStub.eliminar.getCalls().length).toBe(1);
  });
});
