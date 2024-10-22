import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('competencias')
export class Competencia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  codigo: string;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  descripcion: string;
}
