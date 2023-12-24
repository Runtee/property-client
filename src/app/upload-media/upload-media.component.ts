import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-upload-media',
  templateUrl: './upload-media.component.html',
  styles: ``
})
export class UploadMediaComponent {
  selectedImage: File | null = null;
  selectedVideo: File | null = null;

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
