import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';

import { CocheDto } from 'src/aplicacion/coche/consulta/dto/coche-dto';
import { DaoCoche } from 'src/dominio/coche/puerto/dao/dao-coche';
import { EntityManager } from 'typeorm';

@Injectable()
export class DaoCocheMysql implements DaoCoche {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async listar(): Promise<CocheDto[]> {
    return this.entityManager.query('SELECT * FROM COCHE');
  }
}
