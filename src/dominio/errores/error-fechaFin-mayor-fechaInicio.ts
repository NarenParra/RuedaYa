import { ErrorDeNegocio } from './error-de-negocio';

export class ErrorFechaFinMayorFechaInicio extends ErrorDeNegocio {
  constructor(mensaje: string) {
    super(mensaje, ErrorFechaFinMayorFechaInicio.name);
  }
}
