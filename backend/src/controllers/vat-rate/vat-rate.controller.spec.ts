import { Test, TestingModule } from '@nestjs/testing';
import { VatRateController } from './vat-rate.controller';

describe('VatRateController', () => {
  let controller: VatRateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VatRateController],
    }).compile();

    controller = module.get<VatRateController>(VatRateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
