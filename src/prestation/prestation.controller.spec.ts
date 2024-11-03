import { Test, TestingModule } from '@nestjs/testing';
import { PrestationController } from './prestation.controller';
import { PrestationService } from './prestation.service';

describe('PrestationController', () => {
  let controller: PrestationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrestationController],
      providers: [PrestationService],
    }).compile();

    controller = module.get<PrestationController>(PrestationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
