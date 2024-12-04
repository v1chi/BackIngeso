import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asistencia } from './entities/asistencia.entity';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { Formacion } from 'src/formaciones/entidades/formacion.entity';
import { Estudiante } from 'src/estudiantes/entidades/estudiante.entity';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class AsistenciasService {
  constructor(
    @InjectRepository(Asistencia)
    private readonly asistenciasRepository: Repository<Asistencia>,
    @InjectRepository(Formacion)
    private readonly formacionesRepository: Repository<Formacion>,
    @InjectRepository(Estudiante)
    private readonly estudiantesRepository: Repository<Estudiante>,
  ) {}

  async create(createAsistenciaDto: CreateAsistenciaDto): Promise<Asistencia> {
    const { estudianteRut, formacionId, ...rest } = createAsistenciaDto;
  
    // Buscar el estudiante por su RUT
    const estudiante = await this.estudiantesRepository.findOneBy({ rut: estudianteRut });
    if (!estudiante) {
      throw new NotFoundException(`Estudiante con RUT ${estudianteRut} no encontrado`);
    }
  
    // Buscar la formación por su ID
    const formacion = await this.formacionesRepository.findOneBy({ id: formacionId });
    if (!formacion) {
      throw new NotFoundException(`Formación con ID ${formacionId} no encontrada`);
    }

    if (formacion.estado !== 'Activa') {
        throw new BadRequestException('No se pueden registrar asistencias para una formación cerrada.');
      }
      
    // Crear la asistencia con las relaciones
    const asistencia = this.asistenciasRepository.create({
      ...rest,
      estudiante,
      formacion,
    });
  
    return this.asistenciasRepository.save(asistencia);
  }
  
  

  async findAll(): Promise<Asistencia[]> {
    return this.asistenciasRepository.find({
      relations: ['formacion', 'estudiante'], // Asegura que traiga las relaciones
    });
  }
  
  async findByFormacion(formacionId: number): Promise<Asistencia[]> {
    return this.asistenciasRepository.find({
      where: { formacion: { id: formacionId } },
      relations: ['formacion', 'estudiante'], // Trae la formación y el estudiante
    });
  }
  
  async update(id: number, updateAsistenciaDto: UpdateAsistenciaDto): Promise<Asistencia> {
    const asistencia = await this.asistenciasRepository.findOneBy({ id });
    if (!asistencia) throw new NotFoundException('Asistencia no encontrada');

    Object.assign(asistencia, updateAsistenciaDto);
    return this.asistenciasRepository.save(asistencia);
  }
}
