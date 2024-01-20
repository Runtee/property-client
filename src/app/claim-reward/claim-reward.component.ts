import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-claim-reward',
  templateUrl: './claim-reward.component.html',
  styles: ``
})
export class ClaimRewardComponent {
  claimForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.claimForm = this.fb.group({
      accountName: ['', [Validators.required]],
      accountNumber: ['', [Validators.required]],
      bankName: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.claimForm.valid) {
      // Form is valid, proceed with your logic
      console.log('Form submitted:', this.claimForm.value);
    } else {
      // Form is invalid, display error messages or take appropriate action
      console.log('Form is invalid. Please check your inputs.');
    }
  }
}
