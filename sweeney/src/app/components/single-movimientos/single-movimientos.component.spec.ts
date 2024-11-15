import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMovimientosComponent } from './single-movimientos.component';

describe('SingleMovimientosComponent', () => {
  let component: SingleMovimientosComponent;
  let fixture: ComponentFixture<SingleMovimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleMovimientosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleMovimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
