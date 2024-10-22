import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Formacion } from './entidades/formacion.entity';
import { CreateFormacionDto } from './dto/create-formacion.dto';
import { UpdateFormacionDto } from './dto/update-formacion.dto';
import { Competencia } from '../competencias/entidades/competencia.entity';

@Injectable()
export class FormacionesService {
  constructor(
    @InjectRepository(Formacion)
    private formacionesRepository: Repository<Formacion>,

    @InjectRepository(Competencia)
    private competenciasRepository: Repository<Competencia>,
  ) {}

  // Crear una formación con competencias asociadas por código
  async create(createFormacionDto: CreateFormacionDto): Promise<Formacion> {
    const { competencias, ...data } = createFormacionDto;

    // Buscar las competencias por sus códigos usando `In`
    const competenciasEncontradas = await this.competenciasRepository.find({
      where: { codigo: In(competencias) },
    });

    // Crear la formación con las competencias encontradas
    const formacion = this.formacionesRepository.create({
      ...data,
      competencias: competenciasEncontradas,
    });

    return this.formacionesRepository.save(formacion);
  }

  // Obtener todas las formaciones con sus competencias
  findAll(): Promise<Formacion[]> {
    return this.formacionesRepository.find({ relations: ['competencias'] });
  }

  // Obtener una formación por su ID con sus competencias
  async findOne(id: number): Promise<Formacion> {
    const formacion = await this.formacionesRepository.findOne({
      where: { id },
      relations: ['competencias'],
    });

    if (!formacion) throw new NotFoundException('Formación no encontrada');
    return formacion;
  }

  // Actualizar una formación y sus competencias por código
  async update(id: number, updateFormacionDto: UpdateFormacionDto): Promise<Formacion> {
    const { competencias, ...data } = updateFormacionDto;

    const formacion = await this.findOne(id);

    // Si se envían nuevos códigos de competencias, actualizarlas
    if (competencias) {
      const competenciasEncontradas = await this.competenciasRepository.find({
        where: { codigo: In(competencias) },
      });
      formacion.competencias = competenciasEncontradas;
    }

    // Actualizar los demás campos de la formación
    Object.assign(formacion, data);
    return this.formacionesRepository.save(formacion);
  }

  // Eliminar una formación por su ID
  async remove(id: number): Promise<void> {
    const result = await this.formacionesRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Formación no encontrada');
    }
  }
}
