import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficasSingleComponent } from './graficas-single.component';

describe('GraficasSingleComponent', () => {
  let component: GraficasSingleComponent;
  let fixture: ComponentFixture<GraficasSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficasSingleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficasSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
