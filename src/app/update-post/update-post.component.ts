import { Component, ElementRef, ViewChild } from '@angular/core';
import { propertyInterface } from '../interfaces/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../main.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize, of, throwError } from 'rxjs';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
})
export class UpdatePostComponent {
  main_data: propertyInterface[] = [];
  filteredData: propertyInterface[] = [];
  selectedCard: propertyInterface | null = null;
  isLoading = true;
  showCopiedAlert = false
  is404 = false;
  alertTimeout: any;
  copyTab = false
  propertyId :string | null = ""
  isModal = false

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('searchfileInput') searchfileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('CofOfileInput') CofOfileInput!: ElementRef<HTMLInputElement>;

  constructor(private clipboardService: Clipboard, private router: Router, private route: ActivatedRoute, private mainService: MainService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.propertyId = params.get('id');
      
      if (this.propertyId) {
        this.mainService.getPropertyById(this.propertyId)
          .pipe(
            catchError((error) => {
              if (error instanceof HttpErrorResponse && error.status === 404) {
                this.is404 = true;
              } else {
                console.error('Error fetching property data:', error);
                return throwError(() => new Error('Something went wrong'));
              }
              return of(null);
            })
          )
          .subscribe((item: propertyInterface | null) => {
            if (item !== null) {
              this.selectedCard = item;
            }
          });
      }
    });

    this.mainService.getTrendings()
      .pipe(
        catchError((error) => {
          console.error('Error fetching trending data:', error);
          return throwError(() => new Error('Something went wrong'));
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((trendings: propertyInterface[]) => {
        this.main_data = trendings;
        this.filteredData = this.main_data;
      });
  }

  // Handle card selection
  selectCards(card: propertyInterface): void {
    this.selectedCard = card;
  }

  opencopyTab() {
    this.copyTab = !this.copyTab;
  }

  // To copy to clipboard
  copy_to_clipboard() {
    const currentURL = window.location.href;
    this.clipboardService.copy(currentURL);
    this.showCopiedAlert = true;

    // Hide the alert after 2 seconds
    this.alertTimeout = setTimeout(() => {
      this.showCopiedAlert = false;
    }, 2000);
  }

  // Function to hide the copied alert
  hideCopiedAlert() {
    this.showCopiedAlert = false;
  }

  // Function to toggle the visibility of the copy tab
  toggleCopyTab() {
    this.copyTab = !this.copyTab;
  }

  // Function to clear the timeout for the copied alert
  clearAlertTimeout() {
    clearTimeout(this.alertTimeout);
  }

  onFileSelected(event: any, category:any) {
    if (!this.propertyId) return
    const selectedFile = event.target.files[0];
    const formData = new FormData();
    formData.append("media_file", selectedFile);
    formData.append("property_id", this.propertyId)
    formData.append("property_kyc_type", category)

    this.mainService.uploadPropertyFile(formData)

  }
closeModal(){
  this.isModal = false

}
  editPost(){}
  deletePost(){}
  openModal(){
    this.isModal = true
  }
}
