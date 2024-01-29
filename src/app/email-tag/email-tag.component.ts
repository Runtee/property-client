import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-email-tags',
  template: `
    <div class="flex flex-wrap -mx-1 text-sm">
      <div *ngFor="let email of emails" class="bg-gray-200 px-1 py-[1px] h-fit m-1 rounded-full flex items-center">
        {{ email }}
        <button type="button" (click)="removeEmail(email)" class="ml-2 focus:outline-none">
          <svg class="w-3 h-3 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <textarea
        [(ngModel)]="newEmail"
        (input)="onInput($event)"
        (keydown.enter)="addEmail()"
        placeholder="Add email and press Enter"
        class="border border-gray-300 p-1 rounded w-full h-10 text-sm"
      ></textarea>
    </div>
  `,
})
export class EmailTagsComponent {
  @Input() emails: string[] = [];
  @Output() emailsChange = new EventEmitter<string[]>();

  newEmail = '';

  addEmail() {
    if (this.newEmail && this.isValidEmail(this.newEmail)) {
      this.emails.push(this.newEmail);
      this.newEmail = '';
      this.emitChanges();
      this.newEmail = '';

    }
  }
  onInput(event: any) {
    this.newEmail = event.target.value;
  }
  onEmailInputChange() {
    this.newEmail = '';
    // You can add additional logic here if needed
  }

  removeEmail(email: string) {
    this.emails = this.emails.filter((e) => e !== email);
    this.emitChanges();
  }

  private emitChanges() {
    this.emailsChange.emit([...this.emails]);
  }

  private isValidEmail(email: string): boolean {
    // You can implement a more sophisticated email validation if needed
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
