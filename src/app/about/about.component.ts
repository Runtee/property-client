import { Component } from '@angular/core';
import { propertyInterface } from '../interfaces/interfaces';
import { data } from '../data';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styles: ``
})
export class AboutComponent {
  main_data: propertyInterface[] = data;
  filteredData: propertyInterface[] = [];
  selectedCard: propertyInterface | null = null;

  // // Handle card selection
  selectCards(card: propertyInterface): void {
    this.selectedCard = card;
  }
}
