import { Component, EventEmitter, Output } from '@angular/core';
import { MainService } from '../main.service';
import { Router } from '@angular/router';
import { propertyInterface } from '../interfaces/interfaces';
import { catchError, finalize, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styles: ''
})
export class PreviewComponent {
  formDetails: propertyInterface | any = null
  @Output() back = new EventEmitter<void>();
  isModal = false
  isLoading = false;
  rSuccess = false
  rError = false

  constructor(private mainService: MainService, private router: Router) { }

  ngOnInit(): void {
    // Retrieve form data from the shared service
    this.formDetails = this.mainService.getFormData();

    if (!this.formDetails || Object.keys(this.formDetails).length === 0) {
      const storedFormData = localStorage.getItem('formDetails');
      this.formDetails = storedFormData ? JSON.parse(storedFormData) : {};
    }
    this.loadImage()
    this.loadVideo()
  }


  async upload() {
    this.isLoading = true
    this.isModal = true
    const formData = new FormData();
    console.log(this.formDetails);


    for (const key in this.formDetails) {
      if (this.formDetails[key] !== null && this.formDetails[key] !== undefined) {
        formData.append(key, this.formDetails[key]);
        if (key == 'image' && !(this.formDetails?.image instanceof Blob)) {
          formData.delete("image")
        }
        if (key == 'video' && !(this.formDetails?.image instanceof Blob)) {
          formData.delete("video")
        }
      }
    }

    this.mainService.createProperty(formData)
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
        console.log('Property created successfully!');
      });
    // localStorage.removeItem("formDetails")

  }
  closeModal() {
this.isModal = false
  }
  loadImage() {
    if (this.formDetails?.image && this.formDetails?.image instanceof Blob) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Update the video source
        const videoElement = document.getElementById('uploadedImage') as HTMLVideoElement;
        if (videoElement) {
          videoElement.src = e.target.result;
          videoElement.load();
        }
      };
      reader.readAsDataURL(this.formDetails.image);
    }
  }

  loadVideo() {
    if (this.formDetails?.video && this.formDetails?.video instanceof Blob) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Update the video source
        const videoElement = document.getElementById('uploadedVideo') as HTMLVideoElement;
        if (videoElement) {
          videoElement.src = e.target.result;
          videoElement.load();
        }
      };
      reader.readAsDataURL(this.formDetails?.video);
    }
  }
  isObjectEmpty(obj: any): boolean {
    if (!obj) return true
    return Object.keys(obj).length === 0;
  }
}
