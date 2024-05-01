import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaMapComponent } from './meta-map.component';

describe('MetaMapComponent', () => {
  let component: MetaMapComponent;
  let fixture: ComponentFixture<MetaMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MetaMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MetaMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
