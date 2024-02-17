import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  @Input() title: string = 'Modal Title';
  @Input() message: string = 'Modal Message';
  @Input() showLoader: boolean = false;
  @Input() loading: boolean = false;
  @Input() success: boolean = false;
  @Input() error: boolean = false;
  @Input() doneLink: string = 'Modal Title';
  @Output() onClose = new EventEmitter<void>();
  @Output() onRetry = new EventEmitter<void>();

  closeModal() {
    this.onClose.emit();
  }

  retry() {
    this.onRetry.emit();
  }
}
