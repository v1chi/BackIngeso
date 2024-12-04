import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Formacion } from '../../formaciones/entidades/formacion.entity';

@Entity('talleres')
export class Taller {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToOne(() => Formacion, { onDelete: 'CASCADE' })
  formacion: Formacion; // Relación con formación avanzada

  @Column({ nullable: true })
  descripcion: string;

  @Column({ type: 'boolean', default: false })
  finalizado: boolean; // Indica si el taller está completado
}
