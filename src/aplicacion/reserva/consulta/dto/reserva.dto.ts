import { ApiProperty } from '@nestjs/swagger';
import { Coche } from 'src/dominio/coche/modelo/coche';

export class ReservaDto {
  @ApiProperty({ example: '2020-10-30T14:36:12.608Z', type: Date })
  fechaInicio: string;

  @ApiProperty({ example: '2020-10-30T14:36:12.608Z', type: Date })
  fechaFin: string;

  @ApiProperty({ example: '75000' })
  precioTotal: number;

  @ApiProperty({ example: 'cl 89 f' })
  direccionUsuarioRecibe: string;

  @ApiProperty({ example: '1' })
  coche: Coche;

  @ApiProperty({ example: '80045654' })
  documento: number;

  @ApiProperty({ example: 'naren' })
  nombre: string;

  @ApiProperty({ example: 'naren@example.com' })
  email: string;

  @ApiProperty({ example: 'cl 89 f' })
  direccion: string;

  @ApiProperty({ example: '3132854762' })
  telefono: string;

  @ApiProperty({ example: 'cedula' })
  tipoDocumento: string;
}
