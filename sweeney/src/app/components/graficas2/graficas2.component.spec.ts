import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Graficas2Component } from './graficas2.component';

describe('Graficas2Component', () => {
  let component: Graficas2Component;
  let fixture: ComponentFixture<Graficas2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Graficas2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Graficas2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
