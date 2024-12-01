import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficasSingle3Component } from './graficas-single3.component';

describe('GraficasSingle3Component', () => {
  let component: GraficasSingle3Component;
  let fixture: ComponentFixture<GraficasSingle3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficasSingle3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficasSingle3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
