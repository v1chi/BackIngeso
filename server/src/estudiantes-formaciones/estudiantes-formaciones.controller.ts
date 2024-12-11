import { Controller, Post, Get, Delete, Param, Body, ParseIntPipe, Patch} from '@nestjs/common';
import { EstudiantesFormacionesService } from './estudiantes-formaciones.service';
import { CreateEstudianteFormacionDto } from './dto/create-estudiante-formacion.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';

@Controller('estudiantes-formaciones')
export class EstudiantesFormacionesController {
  constructor(private readonly estudiantesFormacionesService: EstudiantesFormacionesService) {}

  // Endpoint para asociar un estudiante a una formación
  @Post()
  async asociarEstudianteAFormacion(
    @Body() createEstudianteFormacionDto: CreateEstudianteFormacionDto,
  ) {
    return this.estudiantesFormacionesService.asociarEstudianteAFormacion(
      createEstudianteFormacionDto.estudianteId,
      createEstudianteFormacionDto.formacionId,
      createEstudianteFormacionDto.estado,
    );
  }

  // obtener todas las relaciones
  @Get()
  async findAll() {
    return this.estudiantesFormacionesService.findAll();
  }

  // obtener los participantes de una formación específica
  @Get('formacion/:formacionId')
  async findByFormacion(@Param('formacionId', ParseIntPipe) formacionId: number) {
    return this.estudiantesFormacionesService.findByFormacion(formacionId);
  }

  @Patch(':id')
  updateEstado(@Param('id') id: string, @Body() updateEstadoDto: UpdateEstadoDto) {
    return this.estudiantesFormacionesService.updateEstado(+id, updateEstadoDto);
  }


  // Endpoint para eliminar una relación específica
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.estudiantesFormacionesService.remove(id);
  }
}
