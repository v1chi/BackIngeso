
import { IsString, IsNumber, IsOptional, IsDate, IsArray } from 'class-validator';

export class CreateFormacionDto {
  @IsString()
  nombre: string;

  @IsString()
  sedeFormacion: string;

  @IsString()
  modalidad: string;

  @IsString()
  semestre: string;

  @IsNumber()
  año: number;

  @IsDate()
  fechaInicio: Date;

  @IsDate()
  fechaTermino: Date;

  @IsOptional()
  @IsDate()
  fechaCeremonia?: Date;

  @IsOptional()
  @IsString()
  profesorRelator?: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  competencias: number[] = []; // Array de IDs de competencias
}
