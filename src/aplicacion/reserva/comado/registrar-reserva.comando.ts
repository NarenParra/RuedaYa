import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';
import { Coche } from 'src/dominio/coche/modelo/coche';

export class ComandoRegistrarReserva {
  @IsString()
  @ApiProperty({ example: 1 })
  public tipoDocumento: string;
}
