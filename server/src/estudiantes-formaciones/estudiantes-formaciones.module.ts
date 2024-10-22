import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudiantesFormacionesService } from './estudiantes-formaciones.service';
import { EstudiantesFormacionesController } from './estudiantes-formaciones.controller';
import { EstudianteFormacion } from './entidades/estudiante_formacion.entity';
import { Estudiante } from '../estudiantes/entidades/estudiante.entity';
import { Formacion } from '../formaciones/entidades/formacion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EstudianteFormacion, Estudiante, Formacion]),
  ],
  controllers: [EstudiantesFormacionesController],
  providers: [EstudiantesFormacionesService],
  exports: [TypeOrmModule], // Exporta el módulo TypeOrm
})
export class EstudiantesFormacionesModule {}
