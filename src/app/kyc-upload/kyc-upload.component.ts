import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-kyc-upload',
  templateUrl: './kyc-upload.component.html',
  styles: ``
})
export class KycUploadComponent implements OnInit {
  kycUploadForm!: FormGroup;
  @Output() next = new EventEmitter<void>();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.kycUploadForm = this.fb.group({
      frontIdImage: ['', Validators.required], // Add more form controls for images if needed
      backIdImage: ['', Validators.required],
      idNumber: ['', Validators.required],
    });
  }

  handleImageChange(event: any, controlName: string) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.kycUploadForm.get(controlName)?.setValue(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  submitForm() {
    // this.kycUploadForm.vali();
    this.next.emit();

    // Implement the logic to handle form submission here
    // You can access form values using this.kycUploadForm.value
    // For example, console.log(this.kycUploadForm.value);
  }
}
