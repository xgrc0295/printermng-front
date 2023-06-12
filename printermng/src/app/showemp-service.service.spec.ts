import { TestBed } from '@angular/core/testing';

import { ShowempServiceService } from './showemp-service.service';

describe('ShowempServiceService', () => {
  let service: ShowempServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowempServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
