import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { MainService } from '../main.service';
import { Router } from '@angular/router';
import { catchError, finalize, throwError } from 'rxjs';
import { propertyInterface } from '../interfaces/interfaces';

@Component({
  selector: 'app-upload-media',
  templateUrl: './upload-media.component.html',
  styles: ``
})
export class UploadMediaComponent {
  selectedImage: File | null = null;
  selectedVideo: File | null = null;
  isModal:boolean = false
  isLoading = true
  formDetails: any = {};
  @Output() back = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  constructor(private mainService: MainService, private router: Router) {}

  ngOnInit(): void {
    // Retrieve form data from the shared service
    // this.formDetails = this.mainService.getFormData();
    const storedFormData = localStorage.getItem('formDetails');
    this.formDetails = storedFormData ? JSON.parse(storedFormData) : {};
    if (!this.formDetails || Object.keys(this.formDetails).length === 0) {
      this.formDetails = this.mainService.getFormData();
    }
  }

  ngOnDestroy(): void {
    localStorage.setItem('formDetails', JSON.stringify(this.formDetails));
  }

  onConfrim(){
    console.log(this.formDetails)
    const formData = new FormData();
    for (const key in this.formDetails) {
      formData.append(key, this.formDetails[key]);
    }
    if (this.selectedVideo) {
      formData.append('image', this.selectedVideo, this.selectedVideo.name); // Use a meaningful key for the file
    }
    if (this.selectedImage) {
      formData.append('video', this.selectedImage, this.selectedImage.name); // Use a meaningful key for the file
    }
    localStorage.setItem('formData', JSON.stringify(formData));
    this.next.emit()
    // this.mainService.createProperty(formData)  
    // .pipe(
    //   catchError((error) => {
    //     console.error('Error uploading data:', error);
    //     return throwError(() => new Error('Something went wrong'));
    //   }),
    //   finalize(() => {
    //     this.isLoading = false;
    //   })
    // )
    // .subscribe((property: propertyInterface) => {
    //   this.router.navigate(['/property', property.id]);
    // });
  }

  openModal(){
    this.isModal = true
  }
  closeModal(){
this.isModal = false
  }

  onImageChange(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.selectedImage = files[0];
      this.loadImage();
    }
  }

  onVideoChange(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.selectedVideo = files[0];
      this.loadVideo();
    }
  }

  loadImage() {
    if (this.selectedImage) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Update the image source
        const imageElement = document.getElementById('uploadedImage') as HTMLImageElement;
        if (imageElement) {
          imageElement.src = e.target.result;
        }
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  loadVideo() {
    if (this.selectedVideo) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Update the video source
        const videoElement = document.getElementById('uploadedVideo') as HTMLVideoElement;
        if (videoElement) {
          videoElement.src = e.target.result;
          videoElement.load();
        }
      };
      reader.readAsDataURL(this.selectedVideo);
    }
  }
  @ViewChild('videoInput') videoInput!: ElementRef<HTMLInputElement>;
  @ViewChild('imageInput') imageInput!: ElementRef<HTMLInputElement>;
  
  selectVideoFile(): void {
    if (this.videoInput) {
        this.videoInput.nativeElement.click();
    }
}

  selectImageFile(): void {
    if (this.imageInput) {
        this.imageInput.nativeElement.click();
    }
}

removeImageFile(): void {
  this.selectedImage = null;
  const imageElement = document.getElementById('uploadedImage') as HTMLImageElement;
  if (imageElement) {
    imageElement.src = '';
  }
}

  removeVideoFile(): void {
    this.selectedVideo = null;
    this.loadVideo();
  }
}
