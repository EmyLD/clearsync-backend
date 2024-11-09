import { Test, TestingModule } from '@nestjs/testing';
import { PrestationsService } from './prestation.service';

describe('PrestationService', () => {
  let service: PrestationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrestationsService],
    }).compile();

    service = module.get<PrestationsService>(PrestationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
