import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateUsuarioDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsEmail()
  correo?: string;

  @IsOptional()
  @IsString()
  clave?: string;

  @IsOptional()
  @IsString()
  tipo?: string; // 'usuario' o 'administrador'
}
