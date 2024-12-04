import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Estudiante } from '../../estudiantes/entidades/estudiante.entity';
import { Formacion } from '../../formaciones/entidades/formacion.entity';

@Entity('asistencias')
export class Asistencia {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Estudiante, { onDelete: 'CASCADE' })
  estudiante: Estudiante;

  @ManyToOne(() => Formacion, { onDelete: 'CASCADE' })
  formacion: Formacion;

  @Column({ type: 'date' })
  fechaSesion: Date;

  @Column({ type: 'boolean', default: false })
  asistio: boolean;
}
