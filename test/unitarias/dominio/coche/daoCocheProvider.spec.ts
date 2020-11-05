import { DaoCoche } from 'src/dominio/coche/puerto/dao/dao-coche';
import { DaoCocheMysql } from 'src/infraestructura/coche/adaptador/dao/dao-coche-mysql';
import { daoCocheProvider } from 'src/infraestructura/coche/proveedor/dao/dao-coche.proveedor';

describe('daoCocheProvider', () => {
  const data = {
    provide: DaoCoche,
    useClass: DaoCocheMysql,
  };
  test('test daoCocheProvider', () => {
    expect(daoCocheProvider).toEqual(data);
  });
});
