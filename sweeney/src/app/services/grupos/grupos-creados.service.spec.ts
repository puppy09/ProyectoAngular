import { TestBed } from '@angular/core/testing';

import { GruposCreadosService } from './grupos-creados.service';

describe('GruposCreadosService', () => {
  let service: GruposCreadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GruposCreadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
