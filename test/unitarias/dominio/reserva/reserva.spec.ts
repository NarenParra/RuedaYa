import { ErrorLongitudInvalida } from 'src/dominio/errores/error-longitud-invalida';
import { Reserva } from 'src/dominio/reserva/modelo/reserva';
import * as moment from 'moment';
import { Coche } from 'src/dominio/coche/modelo/coche';
import { ErrorFechaInicioMenorFechaActual } from 'src/dominio/errores/error-fechaInicio-menor-fechaActual';
import { ErrorFechaFinMayorFechaInicio } from 'src/dominio/errores/error-fechaFin-mayor-fechaInicio';

describe('Reserva', () => {
  const _Reserva = Reserva as any;

  it('Reserva con documento menor que 6 debería retornar error', () => {
    return expect(
      async () =>
        new _Reserva(
          new Date().toISOString(),
          moment()
            .add(7, 'days')
            .toISOString(),
          346500,
          'sdfsdfdsf',
          new Coche(1, 'Mazda', '121', 'CDD-456', 45000),
          'naren',
          '4645',
          'Cedula',
          'jklñ@email.com',
          'cl 45 # 23',
          '45612378',
        ),
    ).rejects.toStrictEqual(
      new ErrorLongitudInvalida('El tamaño mínimo del documento debe ser 6'),
    );
  });

  it('Reserva con fecha de inicio menor a la fecha actual debería retornar error', () => {
    return expect(
      async () =>
        new _Reserva(
          moment()
            .subtract(7, 'days')
            .toISOString(),
          moment()
            .add(7, 'days')
            .toISOString(),
          346500,
          'sdfsdfdsf',
          new Coche(1, 'Mazda', '121', 'CDD-456', 45000),
          'naren',
          '464587285',
          'Cedula',
          'jklñ@email.com',
          'cl 45 # 23',
          '4561',
        ),
    ).rejects.toStrictEqual(
      new ErrorFechaInicioMenorFechaActual(
        'La fecha del inicio de la reserva debe ser mayor o igual a la fecha actual',
      ),
    );
  });
  it('Reserva con fecha de inicio mayor a la fecha de entrega debería retornar error', () => {
    return expect(
      async () =>
        new _Reserva(
          moment()
            .add(7, 'days')
            .toISOString(),
          moment()
            .subtract(7, 'days')
            .toISOString(),
          346500,
          'sdfsdfdsf',
          new Coche(1, 'Mazda', '121', 'CDD-456', 45000),
          'naren',
          '464587285',
          'Cedula',
          'jklñ@email.com',
          'cl 45 # 23',
          '4561',
        ),
    ).rejects.toStrictEqual(
      new ErrorFechaFinMayorFechaInicio(
        'La fecha de entrega debe ser mayor a la fecha de inicio',
      ),
    );
  });
});
