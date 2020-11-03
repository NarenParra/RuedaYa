import { Reserva } from 'src/dominio/reserva/modelo/reserva';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'coche' })
export class CocheEntidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  marca: string;

  @Column()
  modelo: string;

  @Column()
  matricula: string;

  @Column()
  precio: number;
}
