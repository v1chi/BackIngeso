import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Competencia } from './entidades/competencia.entity';
import { CreateCompetenciaDto } from './dto/create-competencia.dto';
import { UpdateCompetenciaDto } from './dto/update-competencia.dto';

@Injectable()
export class CompetenciasService {
  constructor(
    @InjectRepository(Competencia)
    private readonly competenciasRepository: Repository<Competencia>,
  ) {}

  create(createCompetenciaDto: CreateCompetenciaDto): Promise<Competencia> {
    const competencia = this.competenciasRepository.create(createCompetenciaDto);
    return this.competenciasRepository.save(competencia);
  }

  findAll(): Promise<Competencia[]> {
    return this.competenciasRepository.find();
  }

  async findOne(id: number): Promise<Competencia> {
    const competencia = await this.competenciasRepository.findOne({ where: { id } });
    if (!competencia) throw new NotFoundException('Competencia no encontrada');
    return competencia;
  }

  async update(id: number, updateCompetenciaDto: UpdateCompetenciaDto): Promise<Competencia> {
    await this.competenciasRepository.update(id, updateCompetenciaDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.competenciasRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Competencia no encontrada');
    }
  }
}
