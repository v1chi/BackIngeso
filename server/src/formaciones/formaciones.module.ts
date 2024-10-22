import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormacionesService } from './formaciones.service';
import { FormacionesController } from './formaciones.controller';
import { Formacion } from './entidades/formacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Formacion])],
  controllers: [FormacionesController],
  providers: [FormacionesService],
})
export class FormacionesModule {}
