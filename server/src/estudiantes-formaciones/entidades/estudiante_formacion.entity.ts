import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, Unique } from 'typeorm';
import { Formacion } from '../../formaciones/entidades/formacion.entity';
import { Estudiante } from '../../estudiantes/entidades/estudiante.entity';

@Entity('estudiantes_formaciones')
@Unique(['estudiante', 'formacion']) // Evita duplicados en la relación
export class EstudianteFormacion {
  @PrimaryGeneratedColumn()
  id: number;

  // Relación con Estudiante
  @ManyToOne(() => Estudiante, { onDelete: 'CASCADE', eager: true })
  estudiante: Estudiante;

  // Relación con Formación
  @ManyToOne(() => Formacion, { onDelete: 'CASCADE', eager: true })
  formacion: Formacion;

  // Estado del estudiante en la formación
  @Column({ type: 'enum', enum: ['en curso', 'aprobado', 'desertor'], default: 'en curso' })
  estado: 'en curso' | 'aprobado' | 'desertor';

  @Column({ type: 'int', nullable: true, default: 0 })
  talleresAprobados: number;

}
