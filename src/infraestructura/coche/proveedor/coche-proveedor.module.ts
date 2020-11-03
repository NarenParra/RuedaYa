import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManejadorListarCoche } from 'src/aplicacion/coche/consulta/listar-coche.manejador';
import { DaoCoche } from 'src/dominio/coche/puerto/dao/dao-coche';

import { CocheEntidad } from '../entidad/coche.entidad';
import { daoCocheProvider } from './dao/dao-coche.proveedor';

@Module({
  imports: [TypeOrmModule.forFeature([CocheEntidad])],
  providers: [daoCocheProvider, ManejadorListarCoche],
  exports: [ManejadorListarCoche, DaoCoche],
})
export class CocheProveedorModule {}
