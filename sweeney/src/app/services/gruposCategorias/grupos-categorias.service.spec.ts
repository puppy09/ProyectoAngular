import { TestBed } from '@angular/core/testing';

import { GruposCategoriasService } from './grupos-categorias.service';

describe('GruposCategoriasService', () => {
  let service: GruposCategoriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GruposCategoriasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
