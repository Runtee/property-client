import { Component, ElementRef, ViewChild } from '@angular/core';
import { MainService } from '../main.service';

@Component({
  selector: 'app-purchase-confirmation',
  templateUrl: './purchase-confirmation.component.html',
  styles: ``
})
export class PurchaseConfirmationComponent {
  isAwaiting: boolean = false
  isComplete: boolean = false
  isConfirmation: boolean = true
  selectedFile: any = null
  isAgreed: boolean = false;

  @ViewChild('fileInput') fileInput!: ElementRef; // Initialize with '!' operator

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    // Process the selected file here (e.g., upload to server)
    console.log('Selected file:', this.selectedFile);
  }

  constructor(
    private mainService: MainService){}
  onConfirm() {
    if (this.selectedFile && this.isAgreed) {
      console.log(this.isAgreed);
      
      // this.mainService.submitFile("",this.selectedFile)
      // .subscribe({
      //   next: response => {
      //     // Handle successful file submission
      //     this.isConfirmation = false;
      //     this.isAwaiting = true;
      //     console.log('File submitted successfully:', response);

      //   },
      //   error: error => {
      //     // Handle file submission errors
      //     console.error('Error submitting file:', error);
      //   }
      // });
      this.isConfirmation = false
      this.isAwaiting = true

    } else {
      // Handle missing file or unchecked checkbox
      console.error('Please select a file and agree to the terms.');
    }
  }

}
