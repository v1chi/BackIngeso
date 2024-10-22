import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormacionesService } from './formaciones.service';
import { FormacionesController } from './formaciones.controller';
import { Formacion } from './entidades/formacion.entity';
import { CompetenciasModule } from 'src/competencias/competencias.module';

@Module({
  imports: [TypeOrmModule.forFeature([Formacion]), CompetenciasModule],
  controllers: [FormacionesController],
  providers: [FormacionesService],
  exports: [TypeOrmModule], // Exporta el módulo de TypeOrm por seguridad
})
export class FormacionesModule {}
