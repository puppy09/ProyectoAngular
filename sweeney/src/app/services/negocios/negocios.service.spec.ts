import { TestBed } from '@angular/core/testing';

import { NegociosService } from './negocios.service';

describe('NegociosService', () => {
  let service: NegociosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NegociosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
