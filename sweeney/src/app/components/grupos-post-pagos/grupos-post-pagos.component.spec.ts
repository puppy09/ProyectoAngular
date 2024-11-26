import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposPostPagosComponent } from './grupos-post-pagos.component';

describe('GruposPostPagosComponent', () => {
  let component: GruposPostPagosComponent;
  let fixture: ComponentFixture<GruposPostPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GruposPostPagosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GruposPostPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
