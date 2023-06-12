import { TestBed } from '@angular/core/testing';

import { CustomerAndSalesService } from './customer-and-sales.service';

describe('CustomerAndSalesService', () => {
  let service: CustomerAndSalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerAndSalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
