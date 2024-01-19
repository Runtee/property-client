import { Component } from '@angular/core';

@Component({
  selector: 'app-purchase-confirmation',
  templateUrl: './purchase-confirmation.component.html',
  styles: ``
})
export class PurchaseConfirmationComponent {
  isAwaiting: boolean = true
  isComplete: boolean = true
}
