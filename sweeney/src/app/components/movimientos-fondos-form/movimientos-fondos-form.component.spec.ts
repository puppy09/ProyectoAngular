import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientosFondosFormComponent } from './movimientos-fondos-form.component';

describe('MovimientosFondosFormComponent', () => {
  let component: MovimientosFondosFormComponent;
  let fixture: ComponentFixture<MovimientosFondosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovimientosFondosFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovimientosFondosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
