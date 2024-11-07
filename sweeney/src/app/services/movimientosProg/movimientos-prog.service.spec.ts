import { TestBed } from '@angular/core/testing';

import { MovimientosProgService } from './movimientos-prog.service';

describe('MovimientosProgService', () => {
  let service: MovimientosProgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovimientosProgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
