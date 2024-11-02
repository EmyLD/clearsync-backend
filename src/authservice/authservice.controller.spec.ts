import { Test, TestingModule } from '@nestjs/testing';
import { AuthserviceController } from './authservice.controller';
import { AuthserviceService } from './authservice.service';

describe('AuthserviceController', () => {
  let controller: AuthserviceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthserviceController],
      providers: [AuthserviceService],
    }).compile();

    controller = module.get<AuthserviceController>(AuthserviceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
