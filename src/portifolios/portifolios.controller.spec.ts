import { Test, TestingModule } from '@nestjs/testing';
import { PortifoliosController } from './portifolios.controller';
import { PortifoliosService } from './portifolios.service';

describe('PortifoliosController', () => {
  let controller: PortifoliosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortifoliosController],
      providers: [PortifoliosService],
    }).compile();

    controller = module.get<PortifoliosController>(PortifoliosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
