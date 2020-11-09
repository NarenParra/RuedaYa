import {
  Controller,
  Get,
} from '@nestjs/common';

import { CocheDto } from 'src/aplicacion/coche/consulta/dto/coche-dto';
import { ManejadorListarCoche } from 'src/aplicacion/coche/consulta/listar-coche.manejador';

@Controller('coches')
export class CocheControlador {
  constructor(private readonly _manejadorListarCoche: ManejadorListarCoche) { }

  @Get()
  async listar(): Promise<CocheDto[]> {
    return this._manejadorListarCoche.ejecutar();
  }
}
