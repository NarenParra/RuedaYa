import { Module } from '@nestjs/common';
import { CocheControlador } from './controlador/coche-controlador';
import { CocheProveedorModule } from './proveedor/coche-proveedor.module';

@Module({
  imports: [CocheProveedorModule],
  controllers: [CocheControlador],
})
export class CocheModule {}
