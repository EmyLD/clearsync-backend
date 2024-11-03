import { Test, TestingModule } from '@nestjs/testing';
import { PrestationService } from './prestation.service';

describe('PrestationService', () => {
  let service: PrestationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrestationService],
    }).compile();

    service = module.get<PrestationService>(PrestationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
