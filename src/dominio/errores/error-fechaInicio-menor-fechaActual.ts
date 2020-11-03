import { ErrorDeNegocio } from './error-de-negocio';

export class ErrorFechaInicioMenorFechaActual extends ErrorDeNegocio {
  constructor(mensaje: string) {
    super(mensaje, ErrorFechaInicioMenorFechaActual.name);
  }
}
