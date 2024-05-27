import { Component, EventEmitter, Output } from '@angular/core';
import { MainService } from '../main.service';
import { Router } from '@angular/router';
import { propertyInterface } from '../interfaces/interfaces';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styles: '',
})
export class PreviewComponent {
  formDetails: propertyInterface | null | any = null;
  @Output() back = new EventEmitter<void>();
  isModal = false;
  isLoading = false;
  rSuccess = false;
  rError = false;
  mediaFiles: { type: string; url: string; file: File }[] = [];
  isAgreed: boolean = false;

  constructor(private mainService: MainService, private router: Router) {}

  ngOnInit(): void {
    this.loadFormData();
  }

  async upload() {
    this.resetUploadStatus();
    this.isLoading = true;
    this.isModal = true;

    const formData = this.prepareFormData();

    this.mainService.createProperty(formData)
      .pipe(
        catchError((error) => {
          this.handleError(error);
          throw error;
        })
      )
      .subscribe((data: propertyInterface) => {
        if (data.id) {
          this.uploadMediaFiles(data.id);
          this.handleSuccess();
        }
  
      });
  }

  closeModal() {
    this.isModal = false;
  }

  isObjectEmpty(obj: any): boolean {
    return !obj || Object.keys(obj).length === 0;
  }

  private loadFormData(): void {
    this.formDetails = this.mainService.getFormData() || JSON.parse(localStorage.getItem('formDetails') || '{}');
    this.mediaFiles = this.formDetails?.mediaFiles || [];
  }

  private prepareFormData(): FormData {
    const formData = new FormData();
    Object.keys(this.formDetails).forEach((key) => {
      if (this.formDetails[key] !== null && this.formDetails[key] !== undefined && this.formDetails[key]!=="mediaFiles") {
        formData.append(key, this.formDetails[key]);
      }
    });

    if (!this.formDetails?.clonable) {
      formData.delete('specific_cloners');
      formData.delete('cloning_percentage');
      formData.delete('cloning_type');
      formData.delete('clonable');
    }

    return formData;
  }

  private uploadMediaFiles(propertyId: string): void {
    this.mediaFiles.forEach((mediaFile) => {
      if (mediaFile.file instanceof Blob) {
        const formData = new FormData();
        formData.append('media_file', mediaFile.file);
        formData.append('media_type', mediaFile.type);
        this.mainService.mediaProperty(propertyId, formData).subscribe({
          next: () => console.log('Media file uploaded successfully'),
          error: (error) => console.error('Error uploading media file:', error),
        });
      } else {
        console.warn(`Skipping media file with invalid format: ${mediaFile.url}`);
      }
    });
  }

  private resetUploadStatus(): void {
    this.rError = false;
    this.isLoading = true;
    this.isModal = true;
    this.rSuccess = false;
  }

  private handleError(error: any): void {
    console.error('Unknown error:', error);
    this.isLoading = false;
    this.rError = true;
  }

  private handleSuccess(): void {
    this.isLoading = false;
    this.rSuccess = true;
    console.log('Property created successfully!');
    localStorage.removeItem("formDetails")
  }
}
