import { IsOptional, IsString, IsNumber, IsDate, IsArray } from 'class-validator';

export class UpdateFormacionDto {
  @IsOptional()
  @IsString()
  sedeFormacion?: string;

  @IsOptional()
  @IsString()
  modalidad?: string;

  @IsOptional()
  @IsString()
  semestre?: string;

  @IsOptional()
  @IsNumber()
  año?: number;

  @IsOptional()
  @IsDate()
  fechaInicio?: Date;

  @IsOptional()
  @IsDate()
  fechaTermino?: Date;

  @IsOptional()
  @IsDate()
  fechaCeremonia?: Date;

  @IsOptional()
  @IsString()
  profesorRelator?: string;

  @IsOptional()
  @IsString()
  estado?: string; // abierta o cerrada

  @IsOptional()
  @IsNumber()
  aprobados?: number;

  @IsOptional()
  @IsNumber()
  reprobados?: number;

  @IsOptional()
  @IsNumber()
  desercion?: number;

  @IsOptional()
  @IsNumber()
  total?: number;

  @IsOptional()
  @IsArray()
  competencias?: number[]; // IDs de competencias para actualizar
}
