import { TestBed } from '@angular/core/testing';

import { GruposPagosService } from './grupos-pagos.service';

describe('GruposPagosService', () => {
  let service: GruposPagosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GruposPagosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
