import { IsString, IsOptional } from 'class-validator';

export class CreateCompetenciaDto {
  @IsString()
  codigo: string;

  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;
}
