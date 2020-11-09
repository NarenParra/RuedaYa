import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNumber,
  IsString,
} from 'class-validator';
import { Coche } from 'src/dominio/coche/modelo/coche';

export class ComandoRegistrarReserva {
  @IsDateString()
  @ApiProperty({ type: Date })
  public fechaInicio: string;

  @IsDateString()
  @ApiProperty({ type: Date })
  public fechaFin: string;

  @IsNumber()
  @ApiProperty({ example: 132423 })
  public precioTotal: number;

  @IsString()
  @ApiProperty({ example: 'Kr 58Hh - 87 Sur' })
  public direccionUsuarioRecibe: string;

  @ApiProperty({ example: '1' })
  public coche: Coche;

  @IsString()
  @ApiProperty({ example: '132423' })
  public documento: string;

  @IsString()
  @ApiProperty({ example: 'Cris' })
  public nombre: string;

  @IsString()
  @ApiProperty({ example: 'example@example.com' })
  public email: string;

  @IsString()
  @ApiProperty({ example: 'cl-2 # 38' })
  public direccion: string;

  @IsString()
  @ApiProperty({ example: '65422588' })
  public telefono: string;

  @IsString()
  @ApiProperty({ example: 1 })
  public tipoDocumento: string;
}
