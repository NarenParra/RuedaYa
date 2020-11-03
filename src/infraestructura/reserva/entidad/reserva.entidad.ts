import { CocheEntidad } from 'src/infraestructura/coche/entidad/coche.entidad';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'reserva' })
export class ReservaEntidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fechaInicio: Date;

  @Column()
  fechaFin: Date;

  @Column()
  precioTotal: number;

  @Column()
  direccionUsuarioRecibe: string;

  @Column()
  documento: number;

  @Column()
  nombre: string;

  @Column()
  email: string;

  @Column()
  direccion: string;

  @Column()
  telefono: string;

  @Column()
  tipoDocumento: string;

  @ManyToOne(
    () => CocheEntidad,
    coche => coche.id,
    { eager: true },
  )
  @JoinColumn({ name: 'coche' })
  coche: CocheEntidad;
}
