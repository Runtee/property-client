import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styles: ``
})
export class ChangePasswordComponent {

  newPasswordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;
  oldPasswordVisible: boolean = false;

  formErrors: { [key: string]: string } = {};
  isFormSubmitted: boolean = false;

  constructor() {}



  togglePasswordVisibility(field: string): void {
    
    if (field === 'oldPassword') {
        this.oldPasswordVisible = !this.oldPasswordVisible;
    } else if (field === 'newPassword') {
      
        this.newPasswordVisible = !this.newPasswordVisible;
    } else if (field === 'confirmPassword') {
        this.confirmPasswordVisible = !this.confirmPasswordVisible;
    }
}


  changePasswordFormSubmit(form: NgForm): void {
    this.isFormSubmitted = true;
    this.formErrors = {};
    
    const newPassword = form.value.newPassword;
    const confirmPassword = form.value.confirmPassword;

    if (!newPassword) {
      this.formErrors['newPassword'] = 'New Password is required.';
    }

    if (!confirmPassword) {
      this.formErrors['confirmPassword'] = 'Confirm Password is required.';
    }

    if (newPassword !== confirmPassword) {
      this.formErrors['confirmPassword'] = 'Passwords do not match.';
    }

    if (Object.keys(this.formErrors).length === 0) {
      // Perform the change password logic here
      console.log('Changing password...');
      console.log(form.value);
      
    }
  }
}
