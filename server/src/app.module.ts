import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
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
import { TalleresModule } from './talleres/talleres.module';
import { AsistenciasModule } from './asistencias/asistencias.module';
import { Taller } from './talleres/entities/taller.entity';
import { Asistencia } from './asistencias/entities/asistencia.entity';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'test_ingeso',
      entities: [Formacion, Competencia, Estudiante, Usuario, EstudianteFormacion, Taller, Asistencia],
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
    }),
    EstudiantesFormacionesModule,
    FormacionesModule,
    EstudiantesModule,
    CompetenciasModule,
    UsuariosModule,
    TalleresModule,
    AsistenciasModule,
  ],
  controllers: [
    FormacionesController,
    EstudiantesController,
    UsuariosController,
    CompetenciasController,
    EstudiantesFormacionesController,
  ],
  providers: [
    FormacionesService,
    EstudiantesService,
    UsuariosService,
    CompetenciasService,
    EstudiantesFormacionesService,
  ],
})
export class AppModule {}
