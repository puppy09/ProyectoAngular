import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientosFormComponent } from './movimientos-form.component';

describe('MovimientosFormComponent', () => {
  let component: MovimientosFormComponent;
  let fixture: ComponentFixture<MovimientosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovimientosFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovimientosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
