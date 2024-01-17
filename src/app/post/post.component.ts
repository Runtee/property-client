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
  copyTab = false
  constructor(private clipboardService: Clipboard) {} // Inject the ClipboardService
  
  opencopyTab(){
    this.copyTab = !this.copyTab
  }

  // to copy to clipboard
  copy_to_clipboard() {
    const currentURL = window.location.href;
    this.clipboardService.copy(currentURL);
    this.showCopiedAlert = true;

    // Hide the alert after 2 seconds
    setTimeout(() => {
      this.showCopiedAlert = false;
    }, 2000);
  }
}
