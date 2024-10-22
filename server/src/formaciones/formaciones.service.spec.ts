import { Test, TestingModule } from '@nestjs/testing';
import { FormacionesService } from './formaciones.service';

describe('FormacionesService', () => {
  let service: FormacionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormacionesService],
    }).compile();

    service = module.get<FormacionesService>(FormacionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
