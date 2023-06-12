import { TestBed } from '@angular/core/testing';

import { FaultService } from './fault.service';

describe('FaultService', () => {
  let service: FaultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FaultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
