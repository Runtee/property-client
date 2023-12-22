import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
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