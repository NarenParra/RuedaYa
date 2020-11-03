import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ComandoRegistrarCoche {
  @IsString()
  @ApiProperty({ example: 'Mazda' })
  public marca: string;

  @IsString()
  @ApiProperty({ example: '121' })
  public modelo: string;

  @IsString()
  @ApiProperty({ example: 'SH-6' })
  public matricula: string;

  @IsString()
  @ApiProperty({ example: '84000' })
  public precio: number;

  @IsString()
  @ApiProperty({ example: false })
  public estado: boolean;
}
