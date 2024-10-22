import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from './entidades/estudiante.entity';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';

@Injectable()
export class EstudiantesService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudiantesRepository: Repository<Estudiante>,
  ) {}

  create(createEstudianteDto: CreateEstudianteDto): Promise<Estudiante> {
    const estudiante = this.estudiantesRepository.create(createEstudianteDto);
    return this.estudiantesRepository.save(estudiante);
  }

  findAll(): Promise<Estudiante[]> {
    return this.estudiantesRepository.find();
  }

  async findOne(id: number): Promise<Estudiante> {
    const estudiante = await this.estudiantesRepository.findOne({ where: { id } });
    if (!estudiante) throw new NotFoundException('Estudiante no encontrado');
    return estudiante;
  }

  async update(id: number, updateEstudianteDto: UpdateEstudianteDto): Promise<Estudiante> {
    await this.estudiantesRepository.update(id, updateEstudianteDto);
    return this.findOne(id);
  }

}
