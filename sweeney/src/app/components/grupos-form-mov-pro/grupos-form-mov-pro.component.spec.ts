import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposFormMovProComponent } from './grupos-form-mov-pro.component';

describe('GruposFormMovProComponent', () => {
  let component: GruposFormMovProComponent;
  let fixture: ComponentFixture<GruposFormMovProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GruposFormMovProComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GruposFormMovProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
