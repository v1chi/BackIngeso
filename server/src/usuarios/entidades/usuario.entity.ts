import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  rut: string;

  @Column({ unique: true })
  correo: string;

  @Column()
  clave: string;

  @Column()
  tipo: string; // 'usuario' o 'administrador'
}
