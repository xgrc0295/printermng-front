import { TestBed } from '@angular/core/testing';

import { ProcureService } from './procure.service';

describe('ProcureService', () => {
  let service: ProcureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
