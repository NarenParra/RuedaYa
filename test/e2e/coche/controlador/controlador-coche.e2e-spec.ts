import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { createSandbox, SinonStubbedInstance } from 'sinon';
import { ManejadorListarCoche } from 'src/aplicacion/coche/consulta/listar-coche.manejador';
import { DaoCoche } from 'src/dominio/coche/puerto/dao/dao-coche';
import { CocheControlador } from 'src/infraestructura/coche/controlador/coche-controlador';
import { AppLogger } from 'src/infraestructura/configuracion/ceiba-logger.service';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';
import { createStubObj } from 'test/util/create-object.stub';

const sinonSandbox = createSandbox();

describe('Pruebas al controlador de Coche', () => {
  let app: INestApplication;
  let daoCoche: SinonStubbedInstance<DaoCoche>;

  beforeAll(async () => {
    daoCoche = createStubObj<DaoCoche>(['listar'], sinonSandbox);
    const moduleRef = await Test.createTestingModule({
      controllers: [CocheControlador],
      providers: [
        AppLogger,
        { provide: DaoCoche, useValue: daoCoche },
        ManejadorListarCoche,
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

  it('debería listar los coches registrados', () => {
    const coches: any[] = [{ marca: 'mazda', modelo: '121' }];
    daoCoche.listar.returns(Promise.resolve(coches));

    return request(app.getHttpServer())
      .get('/coches')
      .expect(HttpStatus.OK)
      .expect(coches);
  });
});
