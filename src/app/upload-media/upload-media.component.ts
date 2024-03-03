import {
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { MainService } from '../main.service';
import { Router } from '@angular/router';
import { propertyInterface } from '../interfaces/interfaces';

@Component({
  selector: 'app-upload-media',
  templateUrl: './upload-media.component.html',
  styles: ``,
})
export class UploadMediaComponent {
  mediaFiles: { type: string; url: string; file: File }[] = [];
  formDetails: any = {};
  @Output() back = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  constructor(private mainService: MainService, private router: Router) {}

  ngOnInit(): void {
    // Retrieve form data from the shared service
    this.formDetails = this.mainService.getFormData();

    const storedFormData = localStorage.getItem('formDetails');
    if (!this.formDetails || Object.keys(this.formDetails).length === 0) {
      this.formDetails = storedFormData ? JSON.parse(storedFormData) : {};
    }
    this.mediaFiles = this.formDetails.mediaFiles? this.formDetails.mediaFiles : [];
  }

  ngOnDestroy(): void {
    // localStorage.setItem('formDetails', JSON.stringify(this.formDetails));
  }

  onConfrim() {

    if (this.mediaFiles.length) {
      this.formDetails['mediaFiles'] = this.mediaFiles;
    }
    this.mainService.setFormData(this.formDetails);
    this.next.emit();
  }

  onMediaChange(event: any) {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = () => {
          if (file.type.startsWith('image')) {
            this.mediaFiles.push({
              type: 'image',
              url: reader.result as string,
              file:file,
            })
            console.log(file);
            ;
          } else if (file.type.startsWith('video')) {
            this.mediaFiles.push({
              type: 'video',
              url: reader.result as string,
              file: file,
            });
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }

  removeMedia(index: number) {
    this.mediaFiles.splice(index, 1);
  }
}
