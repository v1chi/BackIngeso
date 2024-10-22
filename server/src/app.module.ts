
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormacionesController } from './formaciones/formaciones.controller';
import { EstudiantesController } from './estudiantes/estudiantes.controller';
import { UsuariosController } from './usuarios/usuarios.controller';
import { FormacionesService } from './formaciones/formaciones.service';
import { EstudiantesService } from './estudiantes/estudiantes.service';
import { UsuariosService } from './usuarios/usuarios.service';
import { CompetenciasController } from './competencias/competencias.controller';
import { CompetenciasService } from './competencias/competencias.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [FormacionesController, EstudiantesController, UsuariosController, CompetenciasController],
  providers: [FormacionesService, EstudiantesService, UsuariosService, CompetenciasService],
})
export class AppModule {}
