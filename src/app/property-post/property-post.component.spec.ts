import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyPostComponent } from './property-post.component';

describe('PropertyPostComponent', () => {
  let component: PropertyPostComponent;
  let fixture: ComponentFixture<PropertyPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropertyPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropertyPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
