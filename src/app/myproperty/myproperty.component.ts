import { Component } from '@angular/core';

@Component({
  selector: 'app-myproperty',
  templateUrl: './myproperty.component.html',
  styles: ``
})
export class MypropertyComponent {
  selectedTab: string = 'sold'; // Default selected tab

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}
