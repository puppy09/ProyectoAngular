import { TestBed } from '@angular/core/testing';

import { GruposSubcategoriasService } from './grupos-subcategorias.service';

describe('GruposSubcategoriasService', () => {
  let service: GruposSubcategoriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GruposSubcategoriasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
