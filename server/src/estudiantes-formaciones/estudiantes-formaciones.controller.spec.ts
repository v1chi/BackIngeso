import { Test, TestingModule } from '@nestjs/testing';
import { EstudiantesFormacionesController } from './estudiantes-formaciones.controller';

describe('EstudiantesFormacionesController', () => {
  let controller: EstudiantesFormacionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstudiantesFormacionesController],
    }).compile();

    controller = module.get<EstudiantesFormacionesController>(EstudiantesFormacionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
