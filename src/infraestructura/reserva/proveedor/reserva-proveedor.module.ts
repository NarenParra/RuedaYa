import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManejadorActualizarReserva } from 'src/aplicacion/reserva/comado/actualizar-reserva.manejador';
import { ManejadorEliminarReserva } from 'src/aplicacion/reserva/comado/eliminar-reserva.manejador';
import { ManejadorRegistrarReserva } from 'src/aplicacion/reserva/comado/registrar-reserva.manejador';
import { ManejadorCocheDisponibleReserva } from 'src/aplicacion/reserva/consulta/cocheDisponible-reserva.manejador';
import { ManejadorListarReserva } from 'src/aplicacion/reserva/consulta/listar-reserva.manejador';
import { DaoReserva } from 'src/dominio/reserva/puerto/dao/dao-reserva';
import { RepositorioReserva } from 'src/dominio/reserva/puerto/repositorio/repositorio-reserva';
import { ServicioActualizarReserva } from 'src/dominio/reserva/servicio/servicio-actualizar-reserva';
import { ServicioEliminarReserva } from 'src/dominio/reserva/servicio/servicio-eliminar-reserva';
import { ServicioRegistrarReserva } from 'src/dominio/reserva/servicio/servicio-registrar-reserva';
import { ReservaEntidad } from '../entidad/reserva.entidad';
import { daoReservaProvider } from './dao/dao-resrva.proveedor';
import { repositorioReservaProvider } from './repositorio/repositorio-reserva';
import { servicioActualizarReservaProveedor } from './servicio/servicio-actualizar-reserva';
import { servicioEliminarReservaProveedor } from './servicio/servicio-eliminar-reserva.proveedor';
import { servicioRegistrarReservaProveedor } from './servicio/servicio-registrar-reserva.proveedor';

@Module({
  imports: [TypeOrmModule.forFeature([ReservaEntidad])],
  providers: [
    {
      provide: ServicioRegistrarReserva,
      inject: [RepositorioReserva],
      useFactory: servicioRegistrarReservaProveedor,
    },
    {
      provide: ServicioActualizarReserva,
      inject: [RepositorioReserva],
      useFactory: servicioActualizarReservaProveedor,
    },
    {
      provide: ServicioEliminarReserva,
      inject: [RepositorioReserva],
      useFactory: servicioEliminarReservaProveedor,
    },

    repositorioReservaProvider,
    daoReservaProvider,
    ManejadorRegistrarReserva,
    ManejadorActualizarReserva,
    ManejadorEliminarReserva,
    ManejadorListarReserva,
    ManejadorCocheDisponibleReserva,
  ],
  exports: [
    ServicioRegistrarReserva,
    ServicioActualizarReserva,
    ServicioEliminarReserva,
    ManejadorRegistrarReserva,
    ManejadorActualizarReserva,
    ManejadorEliminarReserva,
    ManejadorListarReserva,
    ManejadorCocheDisponibleReserva,
    RepositorioReserva,
    DaoReserva,
  ],
})
export class ReservaProveedorModule {}
