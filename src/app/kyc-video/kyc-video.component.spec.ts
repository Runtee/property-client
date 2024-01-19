import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycVideoComponent } from './kyc-video.component';

describe('KycVideoComponent', () => {
  let component: KycVideoComponent;
  let fixture: ComponentFixture<KycVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KycVideoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KycVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
