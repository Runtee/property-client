import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-kyc-select',
  templateUrl: './kyc-select.component.html',
  styles: ``,
})
export class KycSelectComponent {
  @Output() next = new EventEmitter<void>();
  selectedCard = '';
  propertyId: string = '';

  cardSelected(idcard: string) {
    this.selectedCard = idcard;
    this.next.emit();
  }
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.propertyId = id;
      }
    });
  }
}
