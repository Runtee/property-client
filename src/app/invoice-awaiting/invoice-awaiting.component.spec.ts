import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceAwaitingComponent } from './invoice-awaiting.component';

describe('InvoiceAwaitingComponent', () => {
  let component: InvoiceAwaitingComponent;
  let fixture: ComponentFixture<InvoiceAwaitingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoiceAwaitingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvoiceAwaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
