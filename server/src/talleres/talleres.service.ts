import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Taller } from './entities/taller.entity';
import { Formacion } from '../formaciones/entidades/formacion.entity';
import { CreateTallerDto } from './dto/create-taller.dto';
import { UpdateTallerDto } from './dto/update-taller.dto';

@Injectable()
export class TalleresService {
  constructor(
    @InjectRepository(Taller)
    private readonly talleresRepository: Repository<Taller>,
    @InjectRepository(Formacion)
    private readonly formacionesRepository: Repository<Formacion>,
  ) {}

  async create(createTallerDto: CreateTallerDto): Promise<Taller> {
    const formacion = await this.formacionesRepository.findOneBy({
      id: createTallerDto.formacionId,
    });

    if (!formacion) {
      throw new NotFoundException('Formación no encontrada');
    }

    const taller = this.talleresRepository.create({
      ...createTallerDto,
      formacion,
    });

    return this.talleresRepository.save(taller);
  }

  async findAll(): Promise<Taller[]> {
    return this.talleresRepository.find({ relations: ['formacion'] });
  }

  async findByFormacion(formacionId: number): Promise<Taller[]> {
    return this.talleresRepository.find({
        where: { formacion: { id: formacionId } },
        relations: ['formacion'], // Esto asegura que siempre traigas la formación asociada si es necesario.
      });
      
  }

  async update(id: number, updateTallerDto: UpdateTallerDto): Promise<Taller> {
    const taller = await this.talleresRepository.findOneBy({ id });
    if (!taller) throw new NotFoundException('Taller no encontrado');

    Object.assign(taller, updateTallerDto);
    return this.talleresRepository.save(taller);
  }

  async remove(id: number): Promise<void> {
    const result = await this.talleresRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Taller no encontrado');
    }
  }
}
