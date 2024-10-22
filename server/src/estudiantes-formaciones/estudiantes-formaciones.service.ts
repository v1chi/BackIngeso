import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteFormacion } from './entidades/estudiante_formacion.entity';
import { Estudiante } from '../estudiantes/entidades/estudiante.entity';
import { Formacion } from '../formaciones/entidades/formacion.entity';
import { UpdateEstadoDto } from './dto/update-estado.dto';

@Injectable()
export class EstudiantesFormacionesService {
  constructor(
    @InjectRepository(EstudianteFormacion)
    private readonly estudiantesFormacionesRepository: Repository<EstudianteFormacion>,

    @InjectRepository(Estudiante)
    private readonly estudiantesRepository: Repository<Estudiante>,

    @InjectRepository(Formacion)
    private readonly formacionesRepository: Repository<Formacion>,
  ) {}

  async asociarEstudianteAFormacion(
    estudianteId: number,
    formacionId: number,
    estado: 'en curso' | 'aprobado' | 'desertor',
  ): Promise<EstudianteFormacion> {
    const estudiante = await this.estudiantesRepository.findOneBy({ id: estudianteId });
    const formacion = await this.formacionesRepository.findOneBy({ id: formacionId });
  
    if (!estudiante) {
      throw new NotFoundException('Estudiante no encontrado');
    }
  
    if (!formacion) {
      throw new NotFoundException('Formación no encontrada');
    }
  
    const nuevaRelacion = this.estudiantesFormacionesRepository.create({
      estudiante,
      formacion,
      estado,
    });
  
    return this.estudiantesFormacionesRepository.save(nuevaRelacion);
  }

  // Obtener todas las relaciones entre estudiantes y formaciones
  async findAll(): Promise<EstudianteFormacion[]> {
    return this.estudiantesFormacionesRepository.find();
  }

    // Actualizar el estado de una relación
    async updateEstado(id: number, updateEstadoDto: UpdateEstadoDto): Promise<EstudianteFormacion> {
        const relacion = await this.estudiantesFormacionesRepository.findOne({ where: { id } });
    
        if (!relacion) throw new NotFoundException('Relación no encontrada');
    
        Object.assign(relacion, updateEstadoDto); // Actualiza solo el estado
        return this.estudiantesFormacionesRepository.save(relacion);
      }

  // Eliminar una relación entre un estudiante y una formación
  async remove(id: number): Promise<void> {
    const result = await this.estudiantesFormacionesRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Relación no encontrada');
    }
  }
}
