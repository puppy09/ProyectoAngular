import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposFormPagoComponent } from './grupos-form-pago.component';

describe('GruposFormPagoComponent', () => {
  let component: GruposFormPagoComponent;
  let fixture: ComponentFixture<GruposFormPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GruposFormPagoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GruposFormPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
