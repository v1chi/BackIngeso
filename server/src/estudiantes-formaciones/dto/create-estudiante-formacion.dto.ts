import { IsEnum, IsNumber } from 'class-validator';

export class CreateEstudianteFormacionDto {
  @IsNumber()
  estudianteId: number;

  @IsNumber()
  formacionId: number;

  @IsEnum(['en curso', 'aprobado', 'desertor'], {
    message: 'Estado debe ser en curso, aprobado o desertor',
  })
  estado: 'en curso' | 'aprobado' | 'desertor';
}
