import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposSingleMovimientosProgramadosComponent } from './grupos-single-movimientos-programados.component';

describe('GruposSingleMovimientosProgramadosComponent', () => {
  let component: GruposSingleMovimientosProgramadosComponent;
  let fixture: ComponentFixture<GruposSingleMovimientosProgramadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GruposSingleMovimientosProgramadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GruposSingleMovimientosProgramadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
