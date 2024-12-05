import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entidades/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
  ) {}

  create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const usuario = this.usuariosRepository.create(createUsuarioDto);
    return this.usuariosRepository.save(usuario);
  }

  async login(email: string, password: string): Promise<boolean> {
    const usuario = await this.findOneByEmail(email);
    if (!usuario) {
        console.log('Usuario no encontrado.');
        return false;
    }
    if (usuario.clave !== password) {
        console.log('Contraseña incorrecta.');
        return false;
    }
    return true;
  }

  findAll(): Promise<Usuario[]> {
    return this.usuariosRepository.find();
  }

  async findOneByEmail(correo: string): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findOne({ where: { correo }});
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return usuario;
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findOne({ where: { id } });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    await this.usuariosRepository.update(id, updateUsuarioDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.usuariosRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Usuario no encontrado');
    }
  }
}
