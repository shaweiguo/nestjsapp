import { Test, TestingModule } from '@nestjs/testing';
import { CommuserService } from './commuser.service';

describe('CommuserService', () => {
  let service: CommuserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommuserService],
    }).compile();

    service = module.get<CommuserService>(CommuserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
