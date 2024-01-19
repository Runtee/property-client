import { Component, Input } from '@angular/core';
import { propertyInterface } from '../interfaces/interfaces';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styles: ``
})
export class PostComponent {
  @Input() selectedCard: propertyInterface | null = null;
  showCopiedAlert: boolean = false;
  copyTab = false;
  alertTimeout: any; // Variable to store the timeout reference

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
