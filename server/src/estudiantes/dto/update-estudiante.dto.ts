import { IsOptional, IsString, IsBoolean, IsEmail } from 'class-validator';

export class UpdateEstudianteDto {
  @IsOptional()
  @IsString()
  nombreCompleto?: string;

  @IsOptional()
  @IsString()
  unidad?: string;

  @IsOptional()
  @IsString()
  carrera?: string;

  @IsOptional()
  @IsEmail()
  correo?: string;

  @IsOptional()
  @IsString()
  sedeEstudiante?: string;

  @IsOptional()
  @IsBoolean()
  egresado?: boolean;
}
