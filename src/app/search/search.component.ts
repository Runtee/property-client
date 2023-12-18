import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { FabComponent } from '../fab/fab.component';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe, FabComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  constructor(private router: Router) { }
  // Search history, suggestions, and results data
  searchHistory: string[] = ['Ubollo', 'Enugu'];
  searchSuggestions: string[] = [
    '10 storey building in Obollo Affor',
    'Ten storey building in Lekki Peninsula',
  ];
  suggestions: string[] = []
  searchResults: any[] = [];
  autofocus = false
  showHistory: boolean = false;
  showSuggestions: boolean = false;
  value: string = ""
  onInputClick() {
    this.router.navigate(['/search']);
    this.showHistory = true;
    this.searchResults = [];
    this.autofocus = true
  }

  onKeyUp(event: KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement;
    // this.searchResults = [];

    if (inputElement) {
      const searchTerm = inputElement.value.trim();
      this.value = searchTerm
      if (searchTerm) {
        this.showHistory = false;
        this.showSuggestions = true;
        this.suggestions = this.searchSuggestions.filter((suggestion) =>
          suggestion.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else {
        this.showSuggestions = false;
      }
    }
  }

  onSearch(event: any) {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value.trim();
    // Replace with your actual search logic and data fetching
    this.searchResults = []; // Simulating search by replacing data
    if (searchTerm === '10 storey') {
      this.searchResults = [
        {
          title: '10 plots of land at Storeylane',
          location: 'Lekki, Lagos State',
          price: 67900,
        },
      ];
    }
    this.showHistory = false;
    this.showSuggestions = false;
  }

  clearHistory() {
    console.log("lllllllllll")
    this.searchHistory = [];
    this.showHistory = true;
    this.showSuggestions = false;
  }
}
