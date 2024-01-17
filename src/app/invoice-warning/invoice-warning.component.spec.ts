import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceWarningComponent } from './invoice-warning.component';

describe('InvoiceWarningComponent', () => {
  let component: InvoiceWarningComponent;
  let fixture: ComponentFixture<InvoiceWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoiceWarningComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvoiceWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
