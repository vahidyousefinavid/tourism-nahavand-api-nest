import { Test, TestingModule } from '@nestjs/testing';
import { EventTimeRangeService } from './event-time-range.service';

describe('EventTimeRangeService', () => {
  let service: EventTimeRangeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventTimeRangeService],
    }).compile();

    service = module.get<EventTimeRangeService>(EventTimeRangeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
