import { Controller, Post, Get, Patch, Param, Body } from '@nestjs/common';
import { AsistenciasService } from './asistencias.service';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';

@Controller('asistencias')
export class AsistenciasController {
  constructor(private readonly asistenciasService: AsistenciasService) {}

  @Post()
  create(@Body() createAsistenciaDto: CreateAsistenciaDto) {
    return this.asistenciasService.create(createAsistenciaDto);
  }

  @Get()
  findAll() {
    return this.asistenciasService.findAll();
  }

  @Get('formacion/:id')
  findByFormacion(@Param('id') id: number) {
    return this.asistenciasService.findByFormacion(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateAsistenciaDto: UpdateAsistenciaDto) {
    return this.asistenciasService.update(id, updateAsistenciaDto);
  }
}
