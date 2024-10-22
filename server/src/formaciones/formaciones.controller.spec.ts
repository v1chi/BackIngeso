import { Test, TestingModule } from '@nestjs/testing';
import { FormacionesController } from './formaciones.controller';

describe('FormacionesController', () => {
  let controller: FormacionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormacionesController],
    }).compile();

    controller = module.get<FormacionesController>(FormacionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
