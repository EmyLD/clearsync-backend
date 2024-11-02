import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './authservice.controller';
import { AuthService } from './authservice.service';

describe('AuthserviceController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    // Correction : récupérez l'instance du contrôleur
    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
