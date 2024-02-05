import { Component, Input } from '@angular/core';
import { propertyInterface } from '../interfaces/interfaces';
import { interval, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Clipboard } from '@angular/cdk/clipboard';

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

  ngOnInit() {
    if (this.selectedCard){
    this.selectedCard.locktimestamp = 1706968474924
    this.selectedCard.is_locked = true
    console.log(this.selectedCard);
    
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
    if (this.selectedCard?.locktimestamp) {      
      const lockTimestamp = new Date(this.selectedCard.locktimestamp);
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
    // Call your API service to update the property
    // ...

    // Update the component after the API request is successful
    // this.selectedCard.is_locked = false; // Assuming the API changes the lock status
    this.stopTrackingTime();
  }

// Variable to store the timeout reference

  constructor(private clipboardService: Clipboard) {} // Inject the ClipboardService

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
