import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MainService } from '../main.service';
import { Location } from '@angular/common';
import { propertyInterface } from '../interfaces/interfaces';

@Component({
  selector: 'app-upload-text',
  templateUrl: './upload-text.component.html'
})
export class UploadTextComponent implements OnInit {
  @Output() next = new EventEmitter<void>();
  formDetails: propertyInterface = {
    email: "",
    number: "",
    name: "",
    address: "",
    title: '',
    description: '',
    location: '',
    city: '',
    state: '',
    category: '',
    price: undefined,
    clonable: false,
    cloning_percentage: undefined,
    clone_type: 'public',
    specific_cloners: [],
    account_name: '',
    account_number: '',
    bank_name: '',
  };
  formErrors: any = {};
  validStates = ['Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara', 'FCT'];
  isFormSubmitted: boolean = false;
  showCloningDetails: boolean = false;
  showAccountDetails: boolean = false;
  showSelectPeople: boolean = false;

  isCloningEnabledRequired: boolean = this.formDetails.clonable==undefined ? false : this.formDetails.clonable;

  constructor(private mainService: MainService, private location: Location) { }

  ngOnInit(): void {
    // Retrieve data from localStorage and populate formDetails
    const storedFormDetails = localStorage.getItem('formDetails');
    if (storedFormDetails) {
      this.formDetails = JSON.parse(storedFormDetails);
      if (this.formDetails.clonable) {
        this.showCloningDetails = this.formDetails.clonable;
      }
      if (!this.formDetails.specific_cloners) {
        this.formDetails.specific_cloners = [];
      }
    }
  }

  goBack(): void {
    this.location.back();
  }

  selectPublic() {
    this.formDetails.clone_type = "public";
  }

  toggleCloning(enabled: boolean) {
    console.log(this.showCloningDetails, this.formDetails.clonable);
    this.showCloningDetails = !this.showCloningDetails;
    this.formDetails.clonable = enabled;
    this.isCloningEnabledRequired = this.formDetails.clonable;
  }

  toggleAccountDetails() {
    this.showAccountDetails = !this.showAccountDetails;
  }

  toggleSelectPeople() {
    this.formDetails.clone_type = "private";
    this.showSelectPeople = !this.showSelectPeople;
  }

  onEmailsChange(updatedEmails: string[]) {
    this.formDetails.specific_cloners = [...updatedEmails];
    // Ensure that newEmail is cleared to avoid duplicate entry issues
    // this.formDetails.specificCloners = [];
  }

  onSubmit(e: Event) {
    e.preventDefault();
    // Reset form errors
    this.formErrors = {};
    this.isFormSubmitted = true;
    // Validate personal details
    this.validateRequired('email', 'Email is required.');
    this.validateRequired('number', 'Number is required.');
    this.validateRequired('name', 'Name is required.');
    this.validateRequired('address', 'Address is required.');

    // Validate property details
    this.validateRequired('title', 'Title is required.');
    this.validateMaxLength('title', 40, 'Title cannot exceed 40 characters.');
    this.validateRequired('description', 'Description is required.');
    this.validateRequired('location', 'Location is required.');
    this.validateRequired('city', 'City is required.');
    this.validateRequired('state', 'State is required.');
    this.validateState('state', 'Invalid state selected.');
    this.validateRequired('category', 'Category is required.');
    if (this.formDetails.clonable) {
      this.validateRequired('cloning_percentage', 'Cloning percentage is required.');
    }
    this.validateRequired('price', 'Price is required.');
    this.validatePositiveNumber('price', 'Price must be a positive number.');

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
    if (!this.formDetails[field]) {
      this.formErrors[field] = errorMessage;
    }
  }

  validateMaxLength(field: string, maxLength: number, errorMessage: string) {
    if (this.formDetails[field] && this.formDetails[field].length > maxLength) {
      this.formErrors[field] = errorMessage;
    }
  }

  validateState(field: string, errorMessage: string) {
    if (!this.validStates.includes(this.formDetails[field].trim())) {
      this.formErrors[field] = errorMessage;
    }
  }

  validatePositiveNumber(field: string, errorMessage: string) {
    const number = parseFloat(this.formDetails[field]);
    if (isNaN(number) || number <= 0) {
      this.formErrors[field] = errorMessage;
    }
  }
}
