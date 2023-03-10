import { Test, TestingModule } from '@nestjs/testing';
import { PortifoliosService } from './portifolios.service';

describe('PortifoliosService', () => {
  let service: PortifoliosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PortifoliosService],
    }).compile();

    service = module.get<PortifoliosService>(PortifoliosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
