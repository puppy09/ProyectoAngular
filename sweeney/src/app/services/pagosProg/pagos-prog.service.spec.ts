import { TestBed } from '@angular/core/testing';

import { PagosProgService } from './pagos-prog.service';

describe('PagosProgService', () => {
  let service: PagosProgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagosProgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
