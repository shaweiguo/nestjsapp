import { Test, TestingModule } from '@nestjs/testing';
import { CommuserController } from './commuser.controller';

describe('CommuserController', () => {
  let controller: CommuserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommuserController],
    }).compile();

    controller = module.get<CommuserController>(CommuserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
