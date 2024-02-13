import { Component, EventEmitter, Output } from '@angular/core';
import { MainService } from '../main.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
})
export class EditPostComponent {
  @Output() next = new EventEmitter<void>();
  constructor(private mainService: MainService, private router: Router, private location: Location) { }
  formDetails: any = {
    cloningEnabled: "true",
    cloningPercentage: null,
    cloningType: 'public',
    specificCloners: [],
    accountName: '',
    accountNumber: '',
    bankName: '',
  };
  formErrors: any = {};
  isFormSubmitted: boolean = false
  showCloningDetails: boolean = false;
  showAccountDetails: boolean = true;
  showSelectPeople: boolean = false;

  goBack(): void {

    this.location.back();
  }
  selectPublic() {
    this.formDetails.cloningType = "public"
  }

  toggleCloning() {
    this.showCloningDetails = !this.showCloningDetails;
  }

  toggleAccountDetails() {
    this.showAccountDetails = !this.showAccountDetails;
  }

  toggleSelectPeople() {
    this.formDetails.cloningType = "private"
    this.showSelectPeople = !this.showSelectPeople;
  }

  onEmailsChange(updatedEmails: string[]) {


    this.formDetails.specificCloners = [...updatedEmails];
    // Ensure that newEmail is cleared to avoid duplicate entry issues
    // this.formDetails.specificCloners = [];
  }



  ngOnInit(): void {
    false
    // Retrieve data from localStorage and populate formDetails
    // const storedFormDetails = localStorage.getItem('formDetails');
    // if (storedFormDetails) {
    //   this.formDetails = JSON.parse(storedFormDetails);
    // }
  }
  onSubmit(e: Event) {
    e.preventDefault()
    // Reset form errors
    this.formErrors = {};
    this.isFormSubmitted = true
    // Validate personal detail
    // If there are no form errors, proceed with form submission
    if (Object.keys(this.formErrors).length === 0) {
      // Handle form submission logic here
      console.log('Form submitted with data:', this.formDetails);
      this.mainService.setFormData(this.formDetails);
      localStorage.setItem('formDetails', JSON.stringify(this.formDetails));
      this.next.emit();
      // Navigate to the next screen (UploadMediaComponent)
      // this.router.navigate(['/upload-media']);
    }
  }

  validateRequired(field: string, errorMessage: string) {
    // Use type assertion to tell TypeScript that `this` has an index signature
    if (!this.formDetails[field]) {
      this.formErrors[field] = errorMessage;
    }
  }

  validateMaxLength(field: string, maxLength: number, errorMessage: string) {
    // Use type assertion to tell TypeScript that `this` has an index signature
    if (this.formDetails[field] && this.formDetails[field].length > maxLength) {
      this.formErrors[field] = errorMessage;
    }
  }
  upload(){

  }


}
