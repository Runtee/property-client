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
  showCloneAlert= false;
  showMessage = false
messageTitle = ""
description = ""
isModalLoading = false
  // if (selectedCard:propertyInterface) {
  //   selectedCard.locktimestamp = "1706834824025"
  //   selectedCard.is_locked = true
  // }
  private intervalSubscription: Subscription | null = null;
  constructor(private clipboardService: Clipboard, private mainService: MainService) { } // Inject the ClipboardService
  private isTimestampPassed(lockTimestamp: number | undefined): boolean {
    if (!lockTimestamp) {
      return true
    }
    const currentTimestamp = new Date().getTime();
    const lockTimestampValue = new Date(lockTimestamp).getTime();
    return currentTimestamp > lockTimestampValue;
  }

  ngOnInit() {
    if (this.selectedCard) {
      console.log(this.selectedCard.lock_timestamp);
      if (this.selectedCard.is_locked && this.isTimestampPassed(this.selectedCard.lock_timestamp)) {
        this.updateProperty();
      } else {
        this.startTrackingTime();
      }
    }
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
    if (this.selectedCard?.id) {
      this.mainService.unlockProperty(this.selectedCard.id).subscribe({
        next: (response) => {
          console.log('Lock Property Response:', response);
          // Update selectedCard after unlocking
          if (this.selectedCard) {
            this.selectedCard.is_locked = false;
          }
        },
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
    if (this.copyTab) {
      window.scrollTo({
        top: document.body.scrollHeight,
        // behavior: 'smooth' // Optional: Use smooth scrolling animation
      });      
    }
  }

  // To copy to clipboard
  copy_to_clipboard() {
    const currentDomain = window.location.origin;
    const link = `${currentDomain}/property/${this.selectedCard?.id}/${this.selectedCard?.user_id}`
    this.clipboardService.copy(link);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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

  cloneProperty() {
    if (this.selectedCard?.id) {
      this.isModalLoading = true
      this.mainService.cloneProperty(this.selectedCard.id)
      .subscribe({
        next: (response) => {
          this.isModalLoading = false
          if (response.can_clone) {
            const currentDomain = window.location.origin;
            const link = `${currentDomain}/property/${this.selectedCard?.id}/${response.user_id}`
            this.clipboardService.copy(link);
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
            this.showCloneAlert = true
            this.alertTimeout = setTimeout(() => {
              this.showCloneAlert = false;
            }, 3000);
          }
          else{
            this.messageTitle = "Error"
            this.description = "You can't clone this advert"
            console.log('cant clone');
            this.showMessage = true
            this.alertTimeout = setTimeout(() => {
              this.showMessage = false;
            }, 5000);
            
          }          
        },
        error: (error) => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          this.isModalLoading = false
          this.messageTitle = "Error"
            this.description = "Error cloning advert"
            this.showMessage = true
            this.alertTimeout = setTimeout(() => {
              this.showMessage = false;
            }, 3000);
          console.error(error)

        }
      })
    }
  }
}
