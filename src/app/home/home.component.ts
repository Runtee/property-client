import { Component } from '@angular/core';
import { propertyInterface } from '../interfaces/interfaces';
import { data, propertyCategory } from "../data"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  main_data: propertyInterface[] = data;
  filteredData: propertyInterface[] = [];
  selectedCard: propertyInterface | null = null;

  ngOnInit(): void {
    this.filteredData = this.main_data;
    if (this.filteredData.length > 0) {
      this.selectedCard = this.filteredData[0];
    }
  }

  // // Handle card selection
  selectCards(card: propertyInterface): void {
    this.selectedCard = card;
  }
}
