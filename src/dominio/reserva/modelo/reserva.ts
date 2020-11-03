import { Coche } from "src/dominio/coche/modelo/coche";

export class Reserva{
    readonly #fechaInicio: Date;
    readonly #fechaFin: Date;
    readonly #precioTotal: number;
    readonly #direccionUsuarioRecibe : string;
    readonly #coche: Coche;

    readonly #documento: number;
    readonly #nombre: string;
    readonly #email: string;
    readonly #direccion: string;
    readonly #telefono: string;
    readonly #tipoDocumento: string;

    constructor(fechaInicio: string, fechaFin: string, precioTotal: number , direccionUsuarioRecibe : string, coche: Coche,  documento: number, nombre: string, email: string, direccion: string, telefono: string, tipoDocumento: string){
        this.#fechaInicio = new Date(fechaInicio);
        this.#fechaFin= new Date(fechaFin);;
        this.#precioTotal= precioTotal;
        this.#direccionUsuarioRecibe = direccionUsuarioRecibe; 
        this.#coche= coche;

        this.#documento = documento;
        this.#nombre = nombre;
        this.#email = email;
        this.#direccion = direccion;
        this.#telefono = telefono;
        this.#tipoDocumento = tipoDocumento;
      
    }
    
    get fechaInicio(): Date{
        return this.#fechaInicio;
    }

    get fechaFin(): Date{
        return this.#fechaFin;
    }

    get precioTotal(): number{
        return this.#precioTotal;
    }

    get direccionUsuarioRecibe(): string{
        return this.#direccionUsuarioRecibe;
    }

  
    get documento(): number {
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
      

    get coche(): Coche{
        return this.#coche;
    }
    
}