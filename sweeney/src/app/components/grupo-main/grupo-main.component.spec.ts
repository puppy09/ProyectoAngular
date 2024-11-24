import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoMainComponent } from './grupo-main.component';

describe('GrupoMainComponent', () => {
  let component: GrupoMainComponent;
  let fixture: ComponentFixture<GrupoMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupoMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrupoMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
