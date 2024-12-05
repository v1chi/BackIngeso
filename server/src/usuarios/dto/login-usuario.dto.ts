import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUsuarioDto {
  @IsEmail()
  @IsNotEmpty()
  correo: string;

  @IsString()
  @IsNotEmpty()
  clave: string;
}