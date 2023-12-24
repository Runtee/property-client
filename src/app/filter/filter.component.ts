import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styles: ``
})
export class FilterComponent {
  @Input() showSearch : boolean = true;
  @Input() showFilter = false;
  @Output() closeFilter: EventEmitter<void> = new EventEmitter<void>();

  showDropdown: boolean = false;

  resetFilter() {
    // Implement logic to reset filter values (clear checkboxes, inputs, etc.)
  }

  applyFilter(formValue: any) {
    console.log('Form Values:', formValue);

    // Implement logic to apply the filter based on form values
    // You can use formValue to access the form values
    // this.showFilter = false;
  }

  closeFilterScreen() {
    this.closeFilter.emit();
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
    console.log("clicked");
    
  }
}
