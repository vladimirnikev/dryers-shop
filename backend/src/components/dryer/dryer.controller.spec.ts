import { Test, TestingModule } from '@nestjs/testing';
import { DryerController } from './dryer.controller';

describe('DryerController', () => {
  let controller: DryerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DryerController],
    }).compile();

    controller = module.get<DryerController>(DryerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
