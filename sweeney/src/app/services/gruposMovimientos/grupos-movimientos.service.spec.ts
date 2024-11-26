import { TestBed } from '@angular/core/testing';

import { GruposMovimientosService } from './grupos-movimientos.service';

describe('GruposMovimientosService', () => {
  let service: GruposMovimientosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GruposMovimientosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
