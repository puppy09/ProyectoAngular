import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposGastosFormComponent } from './grupos-gastos-form.component';

describe('GruposGastosFormComponent', () => {
  let component: GruposGastosFormComponent;
  let fixture: ComponentFixture<GruposGastosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GruposGastosFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GruposGastosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
