import { IsString, IsOptional } from 'class-validator';

export class UpdateCompetenciaDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;
}
