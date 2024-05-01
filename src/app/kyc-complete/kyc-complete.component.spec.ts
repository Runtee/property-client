import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycCompleteComponent } from './kyc-complete.component';

describe('KycCompleteComponent', () => {
  let component: KycCompleteComponent;
  let fixture: ComponentFixture<KycCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KycCompleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KycCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
