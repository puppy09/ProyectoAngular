import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposPostFondosComponent } from './grupos-post-fondos.component';

describe('GruposPostFondosComponent', () => {
  let component: GruposPostFondosComponent;
  let fixture: ComponentFixture<GruposPostFondosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GruposPostFondosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GruposPostFondosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
