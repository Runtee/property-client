import { Component, Input } from '@angular/core';
import { propertyInterface } from '../interfaces/interfaces';
import { interval, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Clipboard } from '@angular/cdk/clipboard';
import { MainService } from '../main.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styles: ``
})
export class PostComponent {
  @Input() selectedCard: propertyInterface | null = null;
  remainingTime: string = '';
  showCopiedAlert: boolean = false;
  copyTab = false;
  alertTimeout: any; 
  // if (selectedCard:propertyInterface) {
  //   selectedCard.locktimestamp = "1706834824025"
  //   selectedCard.is_locked = true
  // }
  private intervalSubscription: Subscription | null = null;
  constructor(private clipboardService: Clipboard,private mainService: MainService) {} // Inject the ClipboardService

  ngOnInit() {
    
    if (this.selectedCard) {
      console.log(this.selectedCard.lock_timestamp)
    }
    this.startTrackingTime();
  }

  ngOnChanges() {
    if (this.selectedCard && this.selectedCard.is_locked) {
      this.startTrackingTime();
    } else {
      this.stopTrackingTime();
    }
  }

  ngOnDestroy() {
    this.stopTrackingTime();
  }

  private startTrackingTime() {
    if (this.selectedCard && this.selectedCard.is_locked) {
      this.intervalSubscription = interval(1000)
        .pipe(
          map(() => this.calculateRemainingTime()),
          tap(() => this.checkLockTimestampReached())
        )
        .subscribe();
    }
  }

  private stopTrackingTime() {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
      this.intervalSubscription = null;
    }
  }

  private calculateRemainingTime(): string {
    if (this.selectedCard?.lock_timestamp) {      
      const lockTimestamp = new Date(this.selectedCard.lock_timestamp);
      const now = new Date();
      const differenceInSeconds = Math.floor((lockTimestamp.getTime() - now.getTime()) / 1000);
  
      if (differenceInSeconds <= 0) {
        return '00 : 00';
      }
  
      const minutes = Math.floor(differenceInSeconds / 60);
      const seconds = differenceInSeconds % 60;
      this.remainingTime = `${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`
      return `${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
    }  
    return '';
  }

  private checkLockTimestampReached() {
    if (this.remainingTime === '00 : 00') {
      this.updateProperty();
    }
  }

  private updateProperty() {
    if (this.selectedCard) {
      this.mainService.unlockProperty(this.selectedCard.id).subscribe({
        next: (response) => {
          console.log('Lock Property Response:', response);       
          }
        ,
        error: (error) => {
          // Handle HTTP request error
          console.error('Lock Property Error:', error);
        }
      });
      this.stopTrackingTime();      
    }

  }

// Variable to store the timeout reference

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
}
