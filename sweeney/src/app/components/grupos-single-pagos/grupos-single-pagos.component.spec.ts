import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposSinglePagosComponent } from './grupos-single-pagos.component';

describe('GruposSinglePagosComponent', () => {
  let component: GruposSinglePagosComponent;
  let fixture: ComponentFixture<GruposSinglePagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GruposSinglePagosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GruposSinglePagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
