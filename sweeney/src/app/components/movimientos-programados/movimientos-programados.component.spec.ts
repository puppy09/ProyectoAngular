import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientosProgramadosComponent } from './movimientos-programados.component';

describe('MovimientosProgramadosComponent', () => {
  let component: MovimientosProgramadosComponent;
  let fixture: ComponentFixture<MovimientosProgramadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovimientosProgramadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovimientosProgramadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
