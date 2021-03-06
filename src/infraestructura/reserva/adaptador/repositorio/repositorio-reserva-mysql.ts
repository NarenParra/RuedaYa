import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coche } from 'src/dominio/coche/modelo/coche';
import { Reserva } from 'src/dominio/reserva/modelo/reserva';
import { RepositorioReserva } from 'src/dominio/reserva/puerto/repositorio/repositorio-reserva';
import { EntityManager, Repository } from 'typeorm';
import { ReservaEntidad } from '../../entidad/reserva.entidad';

@Injectable()
export class RepositorioReservaMysql implements RepositorioReserva {
  constructor(
    @InjectRepository(ReservaEntidad)
    private readonly repositorio: Repository<ReservaEntidad>,
    private readonly entityManager: EntityManager,
  ) {}

  async guardar(reserva: Reserva, precio: number) {
    const entidad = new ReservaEntidad();
    entidad.fechaInicio = reserva.fechaInicio;
    entidad.fechaFin = reserva.fechaFin;
    entidad.precioTotal = precio;
    entidad.direccionUsuarioRecibe = reserva.direccionUsuarioRecibe;
    entidad.coche = reserva.coche;

    entidad.documento = reserva.documento;
    entidad.nombre = reserva.nombre;
    entidad.email = reserva.email;
    entidad.direccion = reserva.direccion;
    entidad.telefono = reserva.telefono;
    entidad.tipoDocumento = reserva.tipoDocumento;

    await this.repositorio.save(entidad);
  }

  async actualizar(reserva: Reserva, id: number) {
    const reservaFind = await this.repositorio.findOne(id);

    if (!reservaFind) console.log('no existe reserva');

    const entidad = new ReservaEntidad();
    entidad.fechaInicio = reserva.fechaInicio;
    entidad.fechaFin = reserva.fechaFin;
    entidad.precioTotal = reserva.precioTotal;
    entidad.direccionUsuarioRecibe = reserva.direccionUsuarioRecibe;
    entidad.coche = reserva.coche;

    entidad.documento = reserva.documento;
    entidad.nombre = reserva.nombre;
    entidad.email = reserva.email;
    entidad.direccion = reserva.direccion;
    entidad.telefono = reserva.telefono;
    entidad.tipoDocumento = reserva.tipoDocumento;

    const editedReserva = Object.assign(reservaFind, entidad);

    return await this.repositorio.save(editedReserva);
  }

  async eliminar(id: number) {
    const reservaFind = await this.repositorio.findOne(id);

    if (!reservaFind) console.log('no existe reserva');

    return await this.repositorio.delete(id);
  }

  async saberPrecioCoche(id: Coche): Promise<number> {
    return await this.entityManager.query(
      `SELECT precio FROM COCHE WHERE '${id}'`,
    );
  }
}
