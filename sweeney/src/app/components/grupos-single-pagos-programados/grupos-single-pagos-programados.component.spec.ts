import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposSinglePagosProgramadosComponent } from './grupos-single-pagos-programados.component';

describe('GruposSinglePagosProgramadosComponent', () => {
  let component: GruposSinglePagosProgramadosComponent;
  let fixture: ComponentFixture<GruposSinglePagosProgramadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GruposSinglePagosProgramadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GruposSinglePagosProgramadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
