import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { createSandbox, SinonStubbedInstance } from 'sinon';
import { AppLogger } from 'src/infraestructura/configuracion/ceiba-logger.service';
import { createStubObj } from 'test/util/create-object.stub';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';
import { ManejadorListarReserva } from 'src/aplicacion/reserva/consulta/listar-reserva.manejador';
import { DaoReserva } from 'src/dominio/reserva/puerto/dao/dao-reserva';
import { ReservaCotrolador } from 'src/infraestructura/reserva/controlador/reserva.controlador';
import { RepositorioReserva } from 'src/dominio/reserva/puerto/repositorio/repositorio-reserva';
import { ServicioRegistrarReserva } from 'src/dominio/reserva/servicio/servicio-registrar-reserva';
import { servicioRegistrarReservaProveedor } from 'src/infraestructura/reserva/proveedor/servicio/servicio-registrar-reserva.proveedor';
import { ServicioActualizarReserva } from 'src/dominio/reserva/servicio/servicio-actualizar-reserva';
import { servicioActualizarReservaProveedor } from 'src/infraestructura/reserva/proveedor/servicio/servicio-actualizar-reserva';
import { ServicioEliminarReserva } from 'src/dominio/reserva/servicio/servicio-eliminar-reserva';
import { servicioEliminarReservaProveedor } from 'src/infraestructura/reserva/proveedor/servicio/servicio-eliminar-reserva.proveedor';
import { ManejadorRegistrarReserva } from 'src/aplicacion/reserva/comado/registrar-reserva.manejador';
import { ManejadorEliminarReserva } from 'src/aplicacion/reserva/comado/eliminar-reserva.manejador';
import { ManejadorActualizarReserva } from 'src/aplicacion/reserva/comado/actualizar-reserva.manejador';
import { ComandoRegistrarReserva } from 'src/aplicacion/reserva/comado/registrar-reserva.comando';
import { Coche } from 'src/dominio/coche/modelo/coche';

import * as moment from 'moment';

const sinonSandbox = createSandbox();

describe('Pruebas al controlador de Reserva', () => {
  let app: INestApplication;
  let repositorioReserva: SinonStubbedInstance<RepositorioReserva>;
  let daoReserva: SinonStubbedInstance<DaoReserva>;

  const nuevoCoche = new Coche(1, 'Mazda', '121', 'CDD-456', 45000);

  beforeAll(async () => {
    repositorioReserva = createStubObj<RepositorioReserva>(
      ['saberPrecioCoche', 'eliminar', 'actualizar', 'guardar'],
      sinonSandbox,
    );
    daoReserva = createStubObj<DaoReserva>(['listar'], sinonSandbox);

    const moduleRef = await Test.createTestingModule({
      controllers: [ReservaCotrolador],
      providers: [
        AppLogger,

        {
          provide: ServicioRegistrarReserva,
          inject: [RepositorioReserva],
          useFactory: servicioRegistrarReservaProveedor,
        },
        {
          provide: ServicioActualizarReserva,
          inject: [RepositorioReserva],
          useFactory: servicioActualizarReservaProveedor,
        },
        {
          provide: ServicioEliminarReserva,
          inject: [RepositorioReserva],
          useFactory: servicioEliminarReservaProveedor,
        },
        { provide: RepositorioReserva, useValue: repositorioReserva },

        { provide: DaoReserva, useValue: daoReserva },
        ManejadorListarReserva,
        ManejadorRegistrarReserva,
        ManejadorActualizarReserva,
        ManejadorEliminarReserva,
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
    const reservas: any[] = [
      {
        fechaInicio: new Date().toISOString(),
        fechaFin: moment()
          .add(7, 'days')
          .toISOString(),
        precioTotal: 1234567,
        direccionUsuarioRecibe: 'Lorem ipsum',
        coche: 1,
        nombre: 'Lorem ipsum',
        documento: 'Lorem ipsum',
        tipoDocumento: 'cedula',
        email: 'Lorem ipsum',
        direccion: 'Lorem ipsum',
        telefono: '12345678',
      },
    ];
    daoReserva.listar.returns(Promise.resolve(reservas));

    return request(app.getHttpServer())
      .get('/reservas')
      .expect(HttpStatus.OK)
      .expect(reservas);
  });

  it('debería fallar al registar una reserva documento muy corto', async () => {
    const reserva: ComandoRegistrarReserva = {
      fechaInicio: new Date().toISOString(),
      fechaFin: moment()
        .add(7, 'days')
        .toISOString(),
      precioTotal: 1234567,
      direccionUsuarioRecibe: 'Lorem ipsum',
      coche: nuevoCoche,
      nombre: 'Lorem ipsum',
      documento: '1234',
      tipoDocumento: 'cedula',
      email: 'Lorem ipsum',
      direccion: 'Lorem ipsum',
      telefono: '123454544',
    };
    const mensaje = 'El tamaño mínimo del documento debe ser 6';

    const response = await request(app.getHttpServer())
      .post('/reservas')
      .send(reserva)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(mensaje);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it('debería fallar al registar una reserva telefono muy corto', async () => {
    const reserva: ComandoRegistrarReserva = {
      fechaInicio: new Date().toISOString(),
      fechaFin: moment()
        .add(7, 'days')
        .toISOString(),
      precioTotal: 1234567,
      direccionUsuarioRecibe: 'Lorem ipsum',
      coche: nuevoCoche,
      nombre: 'Lorem ipsum',
      documento: '123478945',
      tipoDocumento: 'cedula',
      email: 'Lorem ipsum',
      direccion: 'Lorem ipsum',
      telefono: '123',
    };
    const mensaje = 'El tamaño mínimo del telefono debe ser 8';

    const response = await request(app.getHttpServer())
      .post('/reservas')
      .send(reserva)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(mensaje);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it('debería fallar al registar una reserva con una fecha de inicio menor a la fecha actual', async () => {
    const reserva: ComandoRegistrarReserva = {
      fechaInicio: moment()
        .subtract(7, 'days')
        .toISOString(),
      fechaFin: moment()
        .add(7, 'days')
        .toISOString(),
      precioTotal: 1234567,
      direccionUsuarioRecibe: 'Lorem ipsum',
      coche: nuevoCoche,
      nombre: 'Lorem ipsum',
      documento: '123478945',
      tipoDocumento: 'cedula',
      email: 'Lorem ipsum',
      direccion: 'Lorem ipsum',
      telefono: '12323444',
    };
    const mensaje =
      'La fecha del inicio de la reserva debe ser mayor o igual a la fecha actual';

    const response = await request(app.getHttpServer())
      .post('/reservas')
      .send(reserva)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(mensaje);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it('debería fallar al actualizar una reserva con una fecha de inicio menor a la fecha actual', async () => {
    const reserva: ComandoRegistrarReserva = {
      fechaInicio: moment()
        .subtract(7, 'days')
        .toISOString(),
      fechaFin: moment()
        .add(7, 'days')
        .toISOString(),
      precioTotal: 1234567,
      direccionUsuarioRecibe: 'Lorem ipsum',
      coche: nuevoCoche,
      nombre: 'Lorem ipsum',
      documento: '123478945',
      tipoDocumento: 'cedula',
      email: 'Lorem ipsum',
      direccion: 'Lorem ipsum',
      telefono: '12323444',
    };
    const mensaje =
      'La fecha del inicio de la reserva debe ser mayor o igual a la fecha actual';

    const response = await request(app.getHttpServer())
      .put('/reservas/80')
      .send(reserva)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(mensaje);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it('debería fallar al registar una reserva con una fecha de entrega menor a la fecha de inicio', async () => {
    const reserva: ComandoRegistrarReserva = {
      fechaInicio: moment()
        .add(7, 'days')
        .toISOString(),
      fechaFin: moment()
        .subtract(7, 'days')
        .toISOString(),
      precioTotal: 1234567,
      direccionUsuarioRecibe: 'Lorem ipsum',
      coche: nuevoCoche,
      nombre: 'Lorem ipsum',
      documento: '123478945',
      tipoDocumento: 'cedula',
      email: 'Lorem ipsum',
      direccion: 'Lorem ipsum',
      telefono: '12323444',
    };
    const mensaje = 'La fecha de entrega debe ser mayor a la fecha de inicio';

    const response = await request(app.getHttpServer())
      .post('/reservas')
      .send(reserva)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(mensaje);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it('debería fallar al actualizar una reserva con una fecha de entrega menor a la fecha de inicio', async () => {
    const reserva: ComandoRegistrarReserva = {
      fechaInicio: moment()
        .add(7, 'days')
        .toISOString(),
      fechaFin: moment()
        .subtract(7, 'days')
        .toISOString(),
      precioTotal: 1234567,
      direccionUsuarioRecibe: 'Lorem ipsum',
      coche: nuevoCoche,
      nombre: 'Lorem ipsum',
      documento: '123478945',
      tipoDocumento: 'cedula',
      email: 'Lorem ipsum',
      direccion: 'Lorem ipsum',
      telefono: '12323444',
    };
    const mensaje = 'La fecha de entrega debe ser mayor a la fecha de inicio';

    const response = await request(app.getHttpServer())
      .put('/reservas/80')
      .send(reserva)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(mensaje);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it('debería  registar una reserva ', async () => {
    const reserva: ComandoRegistrarReserva = {
      fechaInicio: new Date().toISOString(),
      fechaFin: moment()
        .add(7, 'days')
        .toISOString(),
      precioTotal: 1234567,
      direccionUsuarioRecibe: 'Lorem ipsum',
      coche: nuevoCoche,
      nombre: 'Lorem ipsum',
      documento: '1234456',
      tipoDocumento: 'cedula',
      email: 'Lorem ipsum',
      direccion: 'Lorem ipsum',
      telefono: '123454544',
    };
    const mensaje = 'Reserva creada';

    const response = await request(app.getHttpServer())
      .post('/reservas')
      .send(reserva)
      .expect(HttpStatus.CREATED);
    expect(response.body.message).toBe(mensaje);
  });

  it('debería  actualizar una reserva ', async () => {
    const reserva: ComandoRegistrarReserva = {
      fechaInicio: new Date().toISOString(),
      fechaFin: moment()
        .add(7, 'days')
        .toISOString(),
      precioTotal: 1234567,
      direccionUsuarioRecibe: 'Lorem ipsum',
      coche: nuevoCoche,
      nombre: 'Lorem ipsum',
      documento: '1234456',
      tipoDocumento: 'cedula',
      email: 'Lorem ipsum',
      direccion: 'Lorem ipsum',
      telefono: '123454544',
    };
    const mensaje = 'Reserva actualizada';

    const response = await request(app.getHttpServer())
      .put('/reservas/80')
      .send(reserva)
      .expect(HttpStatus.OK);
    expect(response.body.message).toBe(mensaje);
  });

  it('debería  eliminar una reserva ', async () => {
    const mensaje = 'Reserva eliminada';

    const response = await request(app.getHttpServer())
      .delete('/reservas/80')
      .send()
      .expect(HttpStatus.OK);
    expect(response.body.message).toBe(mensaje);
  });
});
