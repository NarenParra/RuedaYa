import { DaoCoche } from 'src/dominio/coche/puerto/dao/dao-coche';
import { DaoCocheMysql } from '../../adaptador/dao/dao-coche-mysql';

export const daoCocheProvider = {
  provide: DaoCoche,
  useClass: DaoCocheMysql,
};
