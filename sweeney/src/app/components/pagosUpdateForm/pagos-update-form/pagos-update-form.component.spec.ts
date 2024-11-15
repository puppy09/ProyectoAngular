import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosUpdateFormComponent } from './pagos-update-form.component';

describe('PagosUpdateFormComponent', () => {
  let component: PagosUpdateFormComponent;
  let fixture: ComponentFixture<PagosUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagosUpdateFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagosUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
