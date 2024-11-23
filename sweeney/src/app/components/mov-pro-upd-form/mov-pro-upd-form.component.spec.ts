import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovProUpdFormComponent } from './mov-pro-upd-form.component';

describe('MovProUpdFormComponent', () => {
  let component: MovProUpdFormComponent;
  let fixture: ComponentFixture<MovProUpdFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovProUpdFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovProUpdFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
