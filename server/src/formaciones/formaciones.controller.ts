import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FormacionesService } from './formaciones.service';
import { CreateFormacionDto } from './dto/create-formacion.dto';
import { UpdateFormacionDto } from './dto/update-formacion.dto'; 

@Controller('formaciones')
export class FormacionesController {
  constructor(private readonly formacionesService: FormacionesService) {}

  @Post()
  create(@Body() createFormacionDto: CreateFormacionDto) {
    console.log('Datos recibidos:', createFormacionDto);
    return this.formacionesService.create(createFormacionDto);
  }

  @Get()
  findAll() {
    return this.formacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formacionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormacionDto: UpdateFormacionDto) {
    return this.formacionesService.update(+id, updateFormacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formacionesService.remove(+id);
  }
}
