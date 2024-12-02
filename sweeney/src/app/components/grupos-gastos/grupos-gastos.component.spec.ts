import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposGastosComponent } from './grupos-gastos.component';

describe('GruposGastosComponent', () => {
  let component: GruposGastosComponent;
  let fixture: ComponentFixture<GruposGastosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GruposGastosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GruposGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
