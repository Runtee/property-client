import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Trending2Component } from './trending2.component';

describe('Trending2Component', () => {
  let component: Trending2Component;
  let fixture: ComponentFixture<Trending2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Trending2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Trending2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
