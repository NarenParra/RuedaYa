import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNumber,
  IsNumberString,
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

  @IsNumberString()
  @ApiProperty({ example: 132423 })
  public precioTotal: number;

  @IsString()
  @ApiProperty({ example: 'Kr 58Hh - 87 Sur' })
  public direccionUsuarioRecibe: string;

  @IsNumber()
  @ApiProperty({ example: '1' })
  public coche: Coche;

  @IsNumberString()
  @ApiProperty({ example: 132423 })
  public documento: number;

  @IsString()
  @ApiProperty({ example: 'William' })
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
