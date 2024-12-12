import { IsEnum, IsOptional } from 'class-validator';

export class UpdateEstadoDto {
  @IsEnum(['en curso', 'aprobado', 'desertor', 'reprobado'], { message: 'Estado no válido' })
  estado: 'en curso' | 'aprobado' | 'desertor' | 'reprobado';
}
