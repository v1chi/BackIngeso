import { Module } from '@nestjs/common';
import { TalleresService } from './talleres.service';
import { TalleresController } from './talleres.controller';
import { Taller } from './entities/taller.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Formacion } from 'src/formaciones/entidades/formacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Taller, Formacion])],
  controllers: [TalleresController],
  providers: [TalleresService],
  exports: [TypeOrmModule, TalleresService], // Exporta el módulo de TypeOrm por seguridad
})
export class TalleresModule {}
