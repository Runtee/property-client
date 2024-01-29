import { Component } from '@angular/core';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styles: ``
})
export class KycComponent {
  currentStep: number = 1;

  // Method to advance to the next step
  nextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  previousStep() {
    // Logic to transition to the previous step
    if (this.currentStep < 1) {
      this.currentStep--;
  }
}
}
