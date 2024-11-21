import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMovimientosProgramadosComponent } from './single-movimientos-programados.component';

describe('SingleMovimientosProgramadosComponent', () => {
  let component: SingleMovimientosProgramadosComponent;
  let fixture: ComponentFixture<SingleMovimientosProgramadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleMovimientosProgramadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleMovimientosProgramadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
