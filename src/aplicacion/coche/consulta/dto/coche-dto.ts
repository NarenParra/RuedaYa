import { ApiProperty } from '@nestjs/swagger';

export class CocheDto {
  @ApiProperty({})
  marca: string;

  @ApiProperty({})
  modelo: string;

  @ApiProperty({})
  matricula: string;

  @ApiProperty({})
  precio: string;
}
