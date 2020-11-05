import { ReservaDto } from 'src/aplicacion/reserva/consulta/dto/reserva.dto';

export abstract class DaoReserva {
  abstract async listar(): Promise<ReservaDto[]>;
  abstract async cocheDisponible(idCoche: number): Promise<ReservaDto[]>;
}
