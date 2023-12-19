import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { FabComponent } from '../fab/fab.component';
import { data, propertyCategory } from "../../data"
import { propertyInterface } from '../interfaces/interfaces';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, SearchComponent, FabComponent, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  main_data: propertyInterface[] = data;
  categories: string[] = propertyCategory;
  selectedCategory: string = '';
  filteredData: propertyInterface[] = [];
  selectedCard: propertyInterface | null = null;

  ngOnInit(): void {
    this.filteredData = this.main_data 
    if (this.filteredData.length > 0) {
      this.selectedCard = this.filteredData[0];
    }
  }

  // Filter data based on the selected category
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

  // Handle card selection
  selectCard(card: propertyInterface): void {
    this.selectedCard = card;
  }
  
}

