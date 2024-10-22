import { IsString, IsEmail } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  nombre: string;

  @IsString()
  rut: string;

  @IsEmail()
  correo: string;

  @IsString()
  clave: string;

  @IsString()
  tipo: string; // 'usuario' o 'administrador'
}
