import * as moment from 'moment';
import { Coche } from "src/dominio/coche/modelo/coche";
import { ErrorFechaFinMayorFechaInicio } from "src/dominio/errores/error-fechaFin-mayor-fechaInicio";
import { ErrorFechaInicioMenorFechaActual } from "src/dominio/errores/error-fechaInicio-menor-fechaActual";
import { ErrorLongitudInvalida } from 'src/dominio/errores/error-longitud-invalida';

const NUMERO_MINIMO_CARACTERES_DOCUMENTO = 6;
const NUMERO_MINIMO_CARACTERES_TELEFONO = 8;

export class Reserva {
  readonly #fechaInicio: Date;
  readonly #fechaFin: Date;
  readonly #precioTotal: number;
  readonly #direccionUsuarioRecibe: string;
  readonly #coche: Coche;

  readonly #documento: string;
  readonly #nombre: string;
  readonly #email: string;
  readonly #direccion: string;
  readonly #telefono: string;
  readonly #tipoDocumento: string;

  constructor(fechaInicio: string, fechaFin: string, precioTotal: number, direccionUsuarioRecibe: string, coche: Coche, documento: string, nombre: string, email: string, direccion: string, telefono: string, tipoDocumento: string) {
    this.validaFechaFinMayorFechaInicio(fechaFin, fechaInicio);
    this.validaFechaInicioMayoroIgualFechaActual(fechaInicio);
    this.validarLongitudDocumento(documento);
    this.validarLongitudTelefono(telefono);

    this.#fechaInicio = new Date(fechaInicio);
    this.#fechaFin = new Date(fechaFin);
    this.#precioTotal = precioTotal;
    this.#direccionUsuarioRecibe = direccionUsuarioRecibe;
    this.#coche = coche;

    this.#documento = documento;
    this.#nombre = nombre;
    this.#email = email;
    this.#direccion = direccion;
    this.#telefono = telefono;
    this.#tipoDocumento = tipoDocumento;
  }

  private validaFechaFinMayorFechaInicio(fechaFin: string, fechaInicio: string) {
    if (!moment(fechaFin).isAfter(fechaInicio)) {

      throw new ErrorFechaFinMayorFechaInicio(
        `La fecha de entrega debe ser mayor a la fecha de inicio`,
      );
    }
  }

  private validaFechaInicioMayoroIgualFechaActual(fechaInicio: string) {

    if (!moment(fechaInicio).isSameOrAfter(moment(moment().add(1, 'd')).toISOString())) {

      throw new ErrorFechaInicioMenorFechaActual(
        `La fecha del inicio de la reserva debe ser mayor o igual a la fecha actual`,
      );
    }
  }

  private validarLongitudDocumento(documento: string) {
    if (documento.length < NUMERO_MINIMO_CARACTERES_DOCUMENTO) {
      throw new ErrorLongitudInvalida(
        `El tamaño mínimo del documento debe ser ${NUMERO_MINIMO_CARACTERES_DOCUMENTO}`,
      );
    }
  }

  private validarLongitudTelefono(telefono: string) {
    if (telefono.length < NUMERO_MINIMO_CARACTERES_TELEFONO) {
      throw new ErrorLongitudInvalida(
        `El tamaño mínimo del telefono debe ser ${NUMERO_MINIMO_CARACTERES_TELEFONO}`,
      );
    }
  }

  get fechaInicio(): Date {
    return this.#fechaInicio;
  }

  get fechaFin(): Date {
    return this.#fechaFin;
  }

  get precioTotal(): number {
    return this.#precioTotal;
  }

  get direccionUsuarioRecibe(): string {
    return this.#direccionUsuarioRecibe;
  }

  get documento(): string {
    return this.#documento;
  }

  get nombre(): string {
    return this.#nombre;
  }

  get email(): string {
    return this.#email;
  }

  get direccion(): string {
    return this.#direccion;
  }

  get telefono(): string {
    return this.#telefono;
  }

  get tipoDocumento(): string {
    return this.#tipoDocumento;
  }

  get coche(): Coche {
    return this.#coche;
  }

}