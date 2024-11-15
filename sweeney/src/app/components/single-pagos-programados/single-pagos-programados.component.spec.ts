import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePagosProgramadosComponent } from './single-pagos-programados.component';

describe('SinglePagosProgramadosComponent', () => {
  let component: SinglePagosProgramadosComponent;
  let fixture: ComponentFixture<SinglePagosProgramadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinglePagosProgramadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglePagosProgramadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
