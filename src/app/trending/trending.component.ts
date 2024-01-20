import { Component, EventEmitter, Input, Output } from '@angular/core';
import { propertyInterface } from '../interfaces/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styles: ``
})
export class TrendingComponent {
  @Input() filteredData: any[] = [];
  @Input() main_data: any[] = [];
  selectedCategory: string = '';
  @Input()  selectedCard: propertyInterface | null = null;

  constructor(private router: Router){}

  @Output() cardSelected: EventEmitter<propertyInterface> = new EventEmitter<propertyInterface>();
  filterData(category: string): void {
    if (this.selectedCategory === category) {
      // If the clicked category is already selected, unselect it and show all categories
      this.selectedCategory = '';
      this.filteredData = this.main_data;
    } else {
      // Filter data based on the selected category
      this.selectedCategory = category;
      this.filteredData = this.main_data.filter(item => item.category === category);
    }
  }
  selectCard(card: propertyInterface): void {
    this.cardSelected.emit(card);
    this.selectedCard = card
    this.router.navigate(['/property', card.id, card.user_id]);
  }
  // selectCard(card: propertyInterface): void {
  //   this.cardSelected.emit(card);
  //   this.selectedCard = card
  // }
}
