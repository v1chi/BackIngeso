import { Module } from '@nestjs/common';
import { AsistenciasService } from './asistencias.service';
import { AsistenciasController } from './asistencias.controller';
import { Asistencia } from './entities/asistencia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Formacion } from 'src/formaciones/entidades/formacion.entity';
import { Estudiante } from 'src/estudiantes/entidades/estudiante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Asistencia, Formacion, Estudiante])],
  controllers: [AsistenciasController],
  providers: [AsistenciasService],
  exports: [TypeOrmModule, AsistenciasService], // Exporta el módulo de TypeOrm por seguridad
})
export class AsistenciasModule {}


