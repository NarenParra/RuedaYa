export class Coche{
    readonly #id: number;
    readonly #marca: string;
    readonly #modelo: string;
    readonly #matricula: string;
    readonly #precio: number;


    constructor(id: number, marca: string, modelo: string, matricula: string, precio: number){
        this.#id = id; 
        this.#marca = marca;
        this.#modelo = modelo;
        this.#matricula = matricula;
        this.#precio = precio;

    }
    
    get id(): number {
        return this.#id;
      }

    get marca(): string{
        return this.#marca;
    }

    get modelo(): string{
        return this.#modelo;
    }

    get matricula(): string{
        return this.#matricula;
    }

    get precio(): number{
        return this.#precio;
    }
}