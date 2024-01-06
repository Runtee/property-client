import { Component } from '@angular/core';
import { MainService } from '../main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
})
export class UploadComponent {
  currentStep: 'upload' | 'upload-media' | 'preview' = 'upload';

  nextStep() {
    // Logic to transition to the next step
    if (this.currentStep === 'upload') {
      this.currentStep = 'upload-media';
    } else if (this.currentStep === 'upload-media') {
      this.currentStep = 'preview';
    }
  }

  previousStep() {
    // Logic to transition to the previous step
    if (this.currentStep === 'upload-media') {
      this.currentStep = 'upload';
    } else if (this.currentStep === 'preview') {
      this.currentStep = 'upload-media';
    }
  }}
