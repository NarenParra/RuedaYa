import { number } from '@hapi/joi';
import { Injectable } from '@nestjs/common';
import { DaoReserva } from 'src/dominio/reserva/puerto/dao/dao-reserva';
import { ReservaDto } from './dto/reserva.dto';

@Injectable()
export class ManejadorCocheDisponibleReserva {
  constructor(private _daoReserva: DaoReserva) {}

  async ejecutar(idCoche: number): Promise<ReservaDto[]> {
    return this._daoReserva.cocheDisponible(idCoche);
  }
}
