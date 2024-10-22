import { Test, TestingModule } from '@nestjs/testing';
import { EstudiantesFormacionesService } from './estudiantes-formaciones.service';

describe('EstudiantesFormacionesService', () => {
  let service: EstudiantesFormacionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstudiantesFormacionesService],
    }).compile();

    service = module.get<EstudiantesFormacionesService>(EstudiantesFormacionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
