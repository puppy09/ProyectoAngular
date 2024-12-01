import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficasSingle6Component } from './graficas-single6.component';

describe('GraficasSingle6Component', () => {
  let component: GraficasSingle6Component;
  let fixture: ComponentFixture<GraficasSingle6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficasSingle6Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficasSingle6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
