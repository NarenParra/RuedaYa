import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { createSandbox, SinonStubbedInstance } from 'sinon';
import { ManejadorListarReserva } from 'src/aplicacion/reserva/consulta/listar-reserva.manejador';
import { DaoReserva } from 'src/dominio/reserva/puerto/dao/dao-reserva';
import { AppLogger } from 'src/infraestructura/configuracion/ceiba-logger.service';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';
import { ReservaCotrolador } from 'src/infraestructura/reserva/controlador/reserva.controlador';
import { createStubObj } from 'test/util/create-object.stub';

const sinonSandbox = createSandbox();

describe('Pruebas al controlador de Reserva', () => {
  let app: INestApplication;
  let daoReserva: SinonStubbedInstance<DaoReserva>;

  beforeAll(async () => {
    daoReserva = createStubObj<DaoReserva>(['listar'], sinonSandbox);
    const moduleRef = await Test.createTestingModule({
      controllers: [ReservaCotrolador],
      providers: [
        AppLogger,
        { provide: DaoReserva, useValue: daoReserva },
        ManejadorListarReserva,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    const logger = await app.resolve(AppLogger);
    logger.customError = sinonSandbox.stub();
    app.useGlobalFilters(new FiltroExcepcionesDeNegocio(logger));
    await app.init();
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  afterAll(async () => {
    await app.close();
  });

  it('debería listar reservas registradas', () => {
    const reservas: any[] = [{}];
    daoReserva.listar.returns(Promise.resolve(reservas));

    return request(app.getHttpServer())
      .get('/reservas')
      .expect(HttpStatus.OK)
      .expect(reservas);
  });
});
