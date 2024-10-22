import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Competencia } from '../../competencias/entidades/competencia.entity';

@Entity('formaciones')
export class Formacion {
  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  nombre: string;

  @Column()
  sedeFormacion: string; // Antofagasta o Coquimbo

  @Column()
  modalidad: string; // online, presencial, b-learning

  @Column()
  semestre: string; // I o II

  @Column()
  año: number;

  @Column({ type: 'timestamp' })
  fechaInicio: Date;

  @Column({ type: 'timestamp' })
  fechaTermino: Date;

  @Column({ type: 'timestamp', nullable: true })
  fechaCeremonia: Date;

  @Column({ nullable: true })
  profesorRelator: string;

  @Column({ nullable: true, default: null })
  estado: string; // abierta o cerrada

  @Column({ nullable: true })
  aprobados: number;

  @Column({ nullable: true })
  reprobados: number;

  @Column({ nullable: true })
  desercion: number;

  @Column({ nullable: true })
  total: number;

  @ManyToMany(() => Competencia)
  @JoinTable()
  competencias: Competencia[];
}
