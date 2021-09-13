import { Test, TestingModule } from '@nestjs/testing';
import { DryerService } from './dryer.service';

describe('DryerService', () => {
  let service: DryerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DryerService],
    }).compile();

    service = module.get<DryerService>(DryerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
