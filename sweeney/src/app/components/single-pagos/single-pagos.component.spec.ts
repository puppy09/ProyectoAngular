import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePagosComponent } from './single-pagos.component';

describe('SinglePagosComponent', () => {
  let component: SinglePagosComponent;
  let fixture: ComponentFixture<SinglePagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinglePagosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglePagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
