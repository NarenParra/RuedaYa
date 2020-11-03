import { Injectable } from '@nestjs/common';
import { DaoCoche } from 'src/dominio/coche/puerto/dao/dao-coche';
import { CocheDto } from './dto/coche-dto';

@Injectable()
export class ManejadorListarCoche {
  constructor(private _daoCoche: DaoCoche) {}

  async ejecutar(): Promise<CocheDto[]> {
    return this._daoCoche.listar();
  }
}
