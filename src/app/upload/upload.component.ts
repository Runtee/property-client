import { Component } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styles: ``
})
export class UploadComponent {

  personalDetails: any = {};
  propertyDetails: any = {};

  onSubmit() {
    // Handle form submission logic here
    console.log('Form submitted with data:', {
      personalDetails: this.personalDetails,
      propertyDetails: this.propertyDetails
    });

    // You can add further logic such as sending the data to a server or performing other actions.
  }
}
