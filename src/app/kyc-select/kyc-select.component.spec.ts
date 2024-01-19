import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycSelectComponent } from './kyc-select.component';

describe('KycSelectComponent', () => {
  let component: KycSelectComponent;
  let fixture: ComponentFixture<KycSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KycSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KycSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
