import { Component, EventEmitter, Output } from '@angular/core';
import { MainService } from '../main.service';
import { Router } from '@angular/router';
import { propertyInterface } from '../interfaces/interfaces';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styles: ''
})
export class PreviewComponent {
  formDetails : propertyInterface | null = null
  @Output() back = new EventEmitter<void>();

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
}
