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

    formacion.total += 1;
    await this.formacionesRepository.save(formacion);
  
    return this.estudiantesFormacionesRepository.save(nuevaRelacion);
  }

  // Obtener todas las relaciones entre estudiantes y formaciones
  async findAll(): Promise<EstudianteFormacion[]> {
    return this.estudiantesFormacionesRepository.find();
  }

  async findByFormacion(formacionId: number): Promise<EstudianteFormacion[]> {
    return this.estudiantesFormacionesRepository.find({
      where: { formacion: { id: formacionId } },
      relations: ['formacion', 'estudiante'],
    });
  }

  async updateEstado(id: number, updateEstadoDto: UpdateEstadoDto): Promise<EstudianteFormacion> {
    const relacion = await this.estudiantesFormacionesRepository.findOne({
      where: { id },
      relations: ['formacion'],
    });
  
    if (!relacion) {
      throw new NotFoundException('Relación no encontrada');
    }
  
    const formacion = relacion.formacion;
  
    // Si el estado está cambiando, ajusta las estadísticas de la formación
    if (relacion.estado !== updateEstadoDto.estado) {
      if (relacion.estado === 'aprobado') {
        formacion.aprobados = Math.max((formacion.aprobados || 0) - 1, 0);
      } else if (relacion.estado === 'desertor') {
        formacion.desercion = Math.max((formacion.desercion || 0) - 1, 0);
      } else if (relacion.estado === 'en curso') {
        formacion.total = Math.max((formacion.total || 0) - 1, 0);
      }
  
      if (updateEstadoDto.estado === 'aprobado') {
        formacion.aprobados = (formacion.aprobados || 0) + 1;
      } else if (updateEstadoDto.estado === 'desertor') {
        formacion.desercion = (formacion.desercion || 0) + 1;
      } else if (updateEstadoDto.estado === 'en curso') {
        formacion.total = (formacion.total || 0) + 1;
      }
  
      // Validar que ningún contador sea negativo antes de guardar
      formacion.aprobados = Math.max(formacion.aprobados || 0, 0);
      formacion.desercion = Math.max(formacion.desercion || 0, 0);
      formacion.total = Math.max(formacion.total || 0, 0);
  
      // Guarda los cambios en la formación
      await this.formacionesRepository.save(formacion);
    }
  
    // Actualiza el estado de la relación
    Object.assign(relacion, updateEstadoDto);
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
