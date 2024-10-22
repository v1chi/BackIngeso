import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetenciasService } from './competencias.service';
import { CompetenciasController } from './competencias.controller';
import { Competencia } from './entidades/competencia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Competencia])],
  controllers: [CompetenciasController],
  providers: [CompetenciasService],
  exports: [TypeOrmModule], // Exporta TypeOrmModule para usarlo en otros módulos
})
export class CompetenciasModule {}
