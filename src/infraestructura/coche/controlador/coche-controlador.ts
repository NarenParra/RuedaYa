import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ComandoRegistrarCoche } from 'src/aplicacion/coche/comando/registrar-coche.comando';
import { CocheDto } from 'src/aplicacion/coche/consulta/dto/coche-dto';
import { ManejadorListarCoche } from 'src/aplicacion/coche/consulta/listar-coche.manejador';

@Controller('coches')
export class CocheControlador {
  constructor(private readonly _manejadorListarCoche: ManejadorListarCoche) {}

  @Get()
  async listar(): Promise<CocheDto[]> {
    return this._manejadorListarCoche.ejecutar();
  }
}
