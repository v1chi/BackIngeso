import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { TalleresService } from './talleres.service';
import { CreateTallerDto } from './dto/create-taller.dto';
import { UpdateTallerDto } from './dto/update-taller.dto';

@Controller('talleres')
export class TalleresController {
  constructor(private readonly talleresService: TalleresService) {}

  @Post()
  create(@Body() createTallerDto: CreateTallerDto) {
    return this.talleresService.create(createTallerDto);
  }

  @Get()
  findAll() {
    return this.talleresService.findAll();
  }

  @Get('formacion/:id')
  findByFormacion(@Param('id') id: number) {
    return this.talleresService.findByFormacion(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTallerDto: UpdateTallerDto) {
    return this.talleresService.update(id, updateTallerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.talleresService.remove(id);
  }
}
