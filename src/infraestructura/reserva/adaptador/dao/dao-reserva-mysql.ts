import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ReservaDto } from 'src/aplicacion/reserva/consulta/dto/reserva.dto';
import { DaoReserva } from 'src/dominio/reserva/puerto/dao/dao-reserva';
import { EntityManager } from 'typeorm';

@Injectable()
export class DaoReservaMysql implements DaoReserva {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}
  async listar(): Promise<ReservaDto[]> {
    return this.entityManager.query('SELECT *FROM RESERVA ');
  }
}
