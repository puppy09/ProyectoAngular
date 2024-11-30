import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposFormPagoProComponent } from './grupos-form-pago-pro.component';

describe('GruposFormPagoProComponent', () => {
  let component: GruposFormPagoProComponent;
  let fixture: ComponentFixture<GruposFormPagoProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GruposFormPagoProComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GruposFormPagoProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
