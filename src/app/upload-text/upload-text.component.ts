import { Component, EventEmitter, Output } from '@angular/core';
import { MainService } from '../main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-text',
  templateUrl: './upload-text.component.html'
})
export class UploadTextComponent {
  @Output() next = new EventEmitter<void>();
  constructor(private mainService: MainService, private router: Router) {}
  formDetails: any = {
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
    price: null,
    cloningEnabled: false,
    cloningPercentage: null,
    specificCloners: '',
    accountName: '',
    accountNumber: '',
    bankName: '',
  };
  formErrors: any = {};
  validStates = ['Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara', 'FCT'];
  isFormSubmitted: boolean = false
  ngOnInit(): void {
    // Retrieve data from localStorage and populate formDetails
    const storedFormDetails = localStorage.getItem('formDetails');
    if (storedFormDetails) {
      this.formDetails = JSON.parse(storedFormDetails);
    }
  }
  onSubmit() {
    // Reset form errors
    this.formErrors = {};
    this.isFormSubmitted = true
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

  validateState(field: string, errorMessage: string) {
    if (!this.validStates.includes(this.formDetails[field].trim())) {
      this.formErrors[field] = errorMessage;
    }
  }

  validatePositiveNumber(field: string, errorMessage: string) {
    const number = parseFloat(this.formDetails[field]);
    // Use type assertion to tell TypeScript that `this` has an index signature
    if (isNaN(number) || number <= 0) {
      this.formErrors[field] = errorMessage;
    }
  }

}
