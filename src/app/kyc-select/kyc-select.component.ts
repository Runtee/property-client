import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-kyc-select',
  templateUrl: './kyc-select.component.html',
  styles: ``
})
export class KycSelectComponent {
  @Output() next = new EventEmitter<void>();   
  selectedCard = ""
  cardSelected(idcard:string){
    this.selectedCard = idcard
    this.next.emit();
  }
}
