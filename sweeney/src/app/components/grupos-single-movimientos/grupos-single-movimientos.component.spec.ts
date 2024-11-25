import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposSingleMovimientosComponent } from './grupos-single-movimientos.component';

describe('GruposSingleMovimientosComponent', () => {
  let component: GruposSingleMovimientosComponent;
  let fixture: ComponentFixture<GruposSingleMovimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GruposSingleMovimientosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GruposSingleMovimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
