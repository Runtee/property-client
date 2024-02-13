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
  isModal: boolean = false
  isLoading = true
  formDetails: any = {};
  @Output() back = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  constructor(private mainService: MainService, private router: Router) { }

  ngOnInit(): void {
    // Retrieve form data from the shared service
    // this.formDetails = this.mainService.getFormData();
    this.formDetails = this.mainService.getFormData();
    
    const storedFormData = localStorage.getItem('formDetails');
    if (!this.formDetails || Object.keys(this.formDetails).length === 0) {
      this.formDetails = storedFormData ? JSON.parse(storedFormData) : {};
    }
    this.selectedImage =  this.formDetails.image instanceof Blob ? this.formDetails.image : null
    this.selectedVideo = this.formDetails.video instanceof Blob ? this.formDetails.video : null
    this.loadImage()
    this.loadVideo()
  }

  ngOnDestroy(): void {
    localStorage.setItem('formDetails', JSON.stringify(this.formDetails));
  }

  onConfrim() {
    const formData = new FormData();

    if (this.selectedVideo) {
      this.formDetails["video"] = this.selectedVideo
    }
    if (this.selectedImage) {
      this.formDetails["image"] = this.selectedImage
    }
    localStorage.setItem('formData', JSON.stringify(formData));
    this.mainService.setFormData(this.formDetails);
    this.next.emit()
  }

  openModal() {
    this.isModal = true
  }
  closeModal() {
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
    if (this.selectedImage && this.selectedImage instanceof Blob) {
      console.log((this.selectedImage))
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
    if (this.selectedVideo && this.selectedVideo instanceof Blob) {
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
    this.formDetails["image"] = null
    this.mainService.setFormData(this.formDetails);
    const imageElement = document.getElementById('uploadedImage') as HTMLImageElement;
    if (imageElement) {
      imageElement.src = '';
    }
  }

  removeVideoFile(): void {
    this.selectedVideo = null;
    this.formDetails["video"] = null
    this.mainService.setFormData(this.formDetails);
    this.loadVideo();
  }
}
