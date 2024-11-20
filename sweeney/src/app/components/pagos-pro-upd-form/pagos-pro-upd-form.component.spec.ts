import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosProUpdFormComponent } from './pagos-pro-upd-form.component';

describe('PagosProUpdFormComponent', () => {
  let component: PagosProUpdFormComponent;
  let fixture: ComponentFixture<PagosProUpdFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagosProUpdFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagosProUpdFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
