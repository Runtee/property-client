import { Clipboard } from '@angular/cdk/clipboard';
import { HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, of, throwError } from 'rxjs';
import { propertyInterface } from '../interfaces/interfaces';
import { MainService } from '../main.service';
import { URL } from '../../environments/environment';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
})
export class UpdatePostComponent {
  main_data: propertyInterface[] = [];
  filteredData: propertyInterface[] = [];
  selectedCard: propertyInterface | null = null;
  isLoading = true;
  showCopiedAlert = false;
  is404 = false;
  alertTimeout: any;
  copyTab = false;
  propertyId: string | null = '';
  userid: string | null = '';
  isModalLoading = false;
  showMessage: boolean = false;
  messageTitle: string = '';
  description: string = '';
  isModal = false;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('searchfileInput') searchfileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('CofOfileInput') CofOfileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('contentContainer') contentContainer!: ElementRef;

  constructor(
    private clipboardService: Clipboard,
    private router: Router,
    private route: ActivatedRoute,
    private mainService: MainService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.propertyId = params.get('id');
      this.userid = params.get('userid');

      if (this.propertyId && this.userid) {
        this.mainService
          .getPropertyById(this.propertyId, this.userid)
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

    this.mainService
      .getTrendings()
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
    if (this.copyTab) {
      this.scrollToBottom();
    }
  }

  scrollToTop(){
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  scrollToBottom(){
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });  
  }
  // To copy to clipboard
  copy_to_clipboard() {
    const currentDomain = window.location.origin;
    const link = `${currentDomain}/property/${this.selectedCard?.id}/${this.selectedCard?.user_id}`;
    this.clipboardService.copy(link);
    this.scrollToTop();
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

  onFileSelected(event: any, category: any) {
    if (!this.propertyId) return;
    this.isModalLoading = true;
    this.showMessage = false;
    this.messageTitle = '';
    this.description = '';
    const selectedFile = event.target.files[0];
    const formData = new FormData();
    formData.append('media_file', selectedFile);
    formData.append('property_id', this.propertyId);
    formData.append('property_kyc_type', category);

    this.mainService
      .uploadPropertyFile(formData)
      .pipe(
        catchError((error) => {
          this.scrollToTop()
          this.showMessage = true;
          this.isModalLoading = false;
          this.messageTitle = 'Error';
          this.description = 'Something went wrong';
          console.error('Unknown error:', error.string);
          setTimeout(() => {
            this.showMessage = false;
          }, 5000);
          return throwError(() => new Error('Something went wrong'));
        })
      )
      .subscribe((data: propertyInterface) => {
        this.selectedCard = data
        console.log(data);
        
        this.scrollToTop()
        this.isModalLoading = false;
        this.showMessage = true;
        this.messageTitle = 'Success';
        this.description = 'Uploaded Successfuly';
        setTimeout(() => {
          this.showMessage = false;
        }, 5000);
      });
  }
  closeModal() {}
  deletePost() {
    this.closeModel();
    this.isModalLoading = true;
    this.showMessage = false;
    this.messageTitle = '';
    this.description = '';
    if (!this.propertyId) return;
    this.mainService
      .deleteProperty(this.propertyId)
      .pipe(
        catchError((error) => {

          console.log(error, "ttttttttttttttttttt");
          this.scrollToTop();
          
          this.showMessage = true;
          this.isModalLoading = false;
          this.messageTitle = 'Error';
          this.description = 'Something went wrong';
          console.error('Unknown error:', error.string);
          setTimeout(() => {
            this.showMessage = false;
          }, 2000);
          return throwError(() => new Error('Something went wrong'));
        })
      )
      .subscribe((event: HttpEvent<any>) => {
        console.log(event, "ppppppp");
        
        this.scrollToTop()
        this.isModalLoading = false;
        this.showMessage = true;
        this.messageTitle = 'Success';
        this.description = 'Deleted Successfuly';
        setTimeout(() => {
          this.showMessage = false;
        }, 2000);
        this.router.navigate(['/profile'])

      });
  }
  openModal() {
    this.isModal = true;
  }
  closeModel() {
    this.isModal = false;
  }

  api = URL
  
  imageModal = false
  modalImg =""
  view_closeModal() {
    this.imageModal = false
    console.log(this.imageModal);
    
}
media_type: string =""
showModal(src:string, media_type:string) {
  this.imageModal = true
  this.modalImg = src;
  this.media_type =  media_type
  console.log(media_type);
  
}
}
