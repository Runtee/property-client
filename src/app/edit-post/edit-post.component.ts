import { Component, EventEmitter, Output } from '@angular/core';
import { MainService } from '../main.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { catchError, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { propertyInterface } from '../interfaces/interfaces';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
})
export class EditPostComponent {
  @Output() next = new EventEmitter<void>();
  propertyId: string | null = '';
  userid: string | null = '';
  formDetails: propertyInterface = {
    title: "",
    clonable: false,
    cloning_percentage: undefined,
    clone_type: 'public',
    specific_cloners: [],
    account_name: '',
    account_number: '',
    bank_name: '',
  };
  formErrors: any = {};
  isFormSubmitted: boolean = false;
  showCloningDetails: boolean = false;
  showAccountDetails: boolean = true;
  showSelectPeople: boolean = false;
  is404 = false;
  isCloningEnabledRequired: boolean = this.formDetails.clonable == undefined ? false : this.formDetails.clonable;
  isModal = false
  isLoading = false
  rSuccess = false
  rError = false
  showEdit = true
  showPreview = false
  constructor(
    private mainService: MainService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.propertyId = params.get('id');
      this.userid = params.get('userid');

      if (this.propertyId &&  this.userid) {
        this.mainService
          .getPropertyById(this.propertyId, this.userid)
          .pipe(
            catchError((error) => {
              if (error instanceof HttpErrorResponse && error.status === 404) {
                this.is404 = true;
              } else {
                console.error('Error fetching property data:', error);
                return throwError(() => new Error('Something went wrong'));
              }
              return of(null);
            })
          )
          .subscribe((item: propertyInterface | null) => {
            if (item !== null) {
              for (const key in item) {
                // Check if the property exists in formDetails
                if (Object.prototype.hasOwnProperty.call(this.formDetails, key)) {
                  // Update the property in formDetails with the value from item
                  this.formDetails[key] = item[key];
                }
              }
              this.showCloningDetails = this.formDetails.clonable ? this.formDetails.clonable: false
            }
          });
      }
    });
  }

  async upload() {
    this.isLoading = true
    this.isModal = true
    
    if (!this.propertyId) return
    const newFormDetails = Object.fromEntries(
      Object.entries(this.formDetails).filter(([key]) => key !== "title")
    );
    
      //update property
    this.mainService.updateProperty(this.propertyId,this.formDetails)
      .pipe(
        catchError(error => {
          this.isLoading = false;
            this.rError = true
            console.error('Unknown error:', error);
            return throwError(() => new Error('Something went wrong'));
          
        })
      )
      .subscribe(() => {
        this.isLoading = false;
        this.rSuccess = true
        console.log('Property updated successfully!');
      });
  }
  closeModal() {
this.isModal = false
  }
  goBack(): void {
    this.location.back();
  }

  selectPublic() {
    this.formDetails.clone_type = 'public';
  }

  toggleCloning(enabled: boolean) {
    this.showCloningDetails = !this.showCloningDetails;
    this.formDetails.clonable = enabled;
    this.isCloningEnabledRequired = this.formDetails.clonable;
  }

  toggleAccountDetails() {
    this.showAccountDetails = !this.showAccountDetails;
  }

  toggleSelectPeople() {
    this.formDetails.clone_type = 'private';
    this.showSelectPeople = !this.showSelectPeople;
  }

  onEmailsChange(updatedEmails: string[]) {
    this.formDetails.specific_cloners = [...updatedEmails];
  }

  onSubmit(e: Event) {
    e.preventDefault();
    // Reset form errors
    this.formErrors = {};
    this.isFormSubmitted = true;
    // Validate personal details
    if (this.formDetails.clonable) {
      this.validateRequired(
        'cloning_percentage',
        'Cloning percentage is required.'
      );
    }
    // If there are no form errors, proceed with form submission
    if (Object.keys(this.formErrors).length === 0) {
      // Handle form submission logic here
      console.log('Form submitted with data:', this.formDetails);
      // this.mainService.setFormData(this.formDetails);
      this.showEdit = false
      this.showPreview = true

    }
    else{
      console.log('Form submitted with data:', this.formErrors);
    }
  }

  validateRequired(field: string, errorMessage: string) {
    if (!this.formDetails[field]) {
      this.formErrors[field] = errorMessage;
    }
  }

  goBacktoform(){
    this.showPreview = false
    this.showEdit = true
  }
}
