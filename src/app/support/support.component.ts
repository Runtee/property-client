import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../main.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styles: ``
})
export class SupportComponent {
  supportForm: FormGroup;
  messageTitle = ""
  messageDesc = "" 
  showCard = false
  constructor(private fb: FormBuilder, private mainService: MainService) {
    this.supportForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    console.log("herr");

    if (this.supportForm.valid) {
      
      // Submit the form data to the server using the mainService
      this.mainService.sendSupport(this.supportForm.value).subscribe({
        next: response => {
          this.messageDesc = 'Support message submitted successfully'
          this.messageTitle = 'Success'
          console.log('Support message submitted successfully:', response);
          this.supportForm.reset();
          this.showCard = true
        },
        error: error => {
          // Handle error submission
          this.messageDesc = 'Error submitting support message'
          this.messageTitle = 'Error'
          // Handle successful submission
          this.supportForm.reset();
          this.showCard = true
          console.error('Error submitting support message:', error);
        }
      });
    } else {
      // Mark all fields as touched to display error messages
      this.supportForm.markAllAsTouched();
    }
  }
}
