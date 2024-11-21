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
    private readonly formacionesRepository: Repository<Formacion>,

    @InjectRepository(Competencia)
    private readonly competenciasRepository: Repository<Competencia>,
  ) {}


  async create(createFormacionDto: CreateFormacionDto): Promise<Formacion> {
    const { competencias, ...data } = createFormacionDto;
  
    // Buscar las competencias por sus códigos usando `In`
    const competenciasEncontradas = await this.competenciasRepository.find({
      where: { id: In(competencias)  },
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



    // Actualizar una formación y sus competencias por ID
  async update(id: number, updateFormacionDto: UpdateFormacionDto): Promise<Formacion> {
    const { competencias, ...data } = updateFormacionDto;

    // Buscar la formación existente
    const formacion = await this.findOne(id);

    // Si se envían nuevos IDs de competencias, actualizarlas
    if (competencias) {
      const competenciasEncontradas = await this.competenciasRepository.find({
        where: { id: In(competencias) }, // Cambiar de 'codigo' a 'id'
      });
      formacion.competencias = competenciasEncontradas; // Asociar las competencias encontradas
    }

    // Actualizar los demás campos de la formación
    Object.assign(formacion, data);

    // Guardar los cambios en la base de datos
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
