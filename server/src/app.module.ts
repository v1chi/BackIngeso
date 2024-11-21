
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
import { EstudiantesFormacionesController } from './estudiantes-formaciones/estudiantes-formaciones.controller';
import { EstudiantesFormacionesService } from './estudiantes-formaciones/estudiantes-formaciones.service';
import { EstudiantesFormacionesModule } from './estudiantes-formaciones/estudiantes-formaciones.module';
import { FormacionesModule } from './formaciones/formaciones.module';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { CompetenciasModule } from './competencias/competencias.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { Formacion } from './formaciones/entidades/formacion.entity';
import { Competencia } from './competencias/entidades/competencia.entity';
import { Estudiante } from './estudiantes/entidades/estudiante.entity';
import { Usuario } from './usuarios/entidades/usuario.entity';
import { EstudianteFormacion } from './estudiantes-formaciones/entidades/estudiante_formacion.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test_ingeso',
      entities: [Formacion, Competencia, Estudiante, Usuario, EstudianteFormacion],
      synchronize: true,
    }),
    EstudiantesFormacionesModule,
    FormacionesModule,
    EstudiantesModule,
    CompetenciasModule,
    UsuariosModule
  ],
  controllers: [FormacionesController, EstudiantesController, UsuariosController, CompetenciasController, EstudiantesFormacionesController],
  providers: [FormacionesService, EstudiantesService, UsuariosService, CompetenciasService, EstudiantesFormacionesService],
})
export class AppModule {}
