import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('estudiantes')
export class Estudiante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  rut: string;

  @Column()
  nombreCompleto: string;

  @Column()
  unidad: string;

  @Column()
  carrera: string;

  @Column({ unique: true })
  correo: string;

  @Column()
  sedeEstudiante: string;

  @Column({ default: false })
  egresado: boolean;
}
