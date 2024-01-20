import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-kyc-video',
  templateUrl: './kyc-video.component.html',
  styles: ``
})
export class KycVideoComponent {
  @ViewChild('video') video!: ElementRef;
  @ViewChild('canvas') canvas!: ElementRef;
  isComplete = false;

  async startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.video.nativeElement.srcObject = stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  }
  ngOnInit(): void {
    this.startCamera()
  }


  captureImage() {
    const video = this.video.nativeElement;
    const canvas = this.canvas.nativeElement;
    const context = canvas.getContext('2d');

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Stop the camera stream after capturing
    const stream = video.srcObject as MediaStream;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());

    this.isComplete = true;
  }
}
