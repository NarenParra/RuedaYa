import { SinonStubbedInstance } from 'sinon';
import { ManejadorListarCoche } from 'src/aplicacion/coche/consulta/listar-coche.manejador';
import { DaoCoche } from 'src/dominio/coche/puerto/dao/dao-coche';
import { createStubObj } from 'test/util/create-object.stub';

describe('manejadorListarCoches>', () => {
  let DaoCocheStub: SinonStubbedInstance<DaoCoche>;
  let manejadorListarCoche: ManejadorListarCoche;

  beforeEach(() => {
    DaoCocheStub = createStubObj<DaoCoche>(['listar']);
    manejadorListarCoche = new ManejadorListarCoche(DaoCocheStub);
  });

  it('listar los coches ', async () => {
    await manejadorListarCoche.ejecutar();

    expect(DaoCocheStub.listar.getCalls().length).toBe(1);
  });
});
