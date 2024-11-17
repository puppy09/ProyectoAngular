import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentasUpdateFormComponent } from './cuentas-update-form.component';

describe('CuentasUpdateFormComponent', () => {
  let component: CuentasUpdateFormComponent;
  let fixture: ComponentFixture<CuentasUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuentasUpdateFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuentasUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
