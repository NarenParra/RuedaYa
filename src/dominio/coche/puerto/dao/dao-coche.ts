import { CocheDto } from 'src/aplicacion/coche/consulta/dto/coche-dto';

export abstract class DaoCoche {
  abstract async listar(): Promise<CocheDto[]>;
}
