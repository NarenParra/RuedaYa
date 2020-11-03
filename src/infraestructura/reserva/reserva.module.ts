import { Module } from '@nestjs/common';
import { ReservaCotrolador } from './controlador/reserva.controlador';
import { ReservaProveedorModule } from './proveedor/reserva-proveedor.module';

@Module({
  imports: [ReservaProveedorModule],
  controllers: [ReservaCotrolador],
})
export class ReservaModule {}
