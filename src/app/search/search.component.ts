import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { FabComponent } from '../fab/fab.component';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'; 

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe, FabComponent, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})

export class SearchComponent {
  searchHistory: string[] = ['Ubollo', 'Enugu'];
  searchSuggestions: string[] = ['10 storey building in Obollo Affor', 'Ten storey building in Lekki Peninsula'];
  suggestions: string[] = [];
  searchResults: any[] = [];
  showHistory: boolean = true;
  showSuggestions: boolean = false;
  showSearch: boolean = true;
  showFilter: boolean = false;
  searchTerm: string = '';

  private searchSubject = new Subject<string>();

  constructor(private router: Router) {
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((searchTerm) => this.handleSearch(searchTerm));
  }

  onInputClick() {
    // this.showHistory = true;
    // this.searchResults = [];
  }

  onKeyUp(event: KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement) {
      const searchTerm = inputElement.value.trim();
      this.searchSubject.next(searchTerm);
    }
  }

  handleSearch(searchTerm: string) {
    this.searchResults = [];

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

  onSearch(event: any) {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm = inputElement.value.trim();

    // Replace with your actual search logic and data fetching
    if (this.searchTerm === '10 storey') {
      this.searchResults = [
        {
          title: '10 plots of land at Storeylane',
          location: 'Lekki, Lagos State',
          price: 67900,
          badges: ['CofO', 'KYC'],
        },
      ];
    }

    // if (this.searchTerm) {
    //   this.handleSearch(this.searchTerm);
    // }

    this.showHistory = false;
    this.showSuggestions = false;
  }

  openFilterScreen() {
    this.showSearch = false;
    this.showFilter = true;
  }

  closeFilterScreen() {
    this.showSearch = true;
    this.showFilter = false;
  }

  resetFilter() {
    // Implement logic to reset filter values (clear checkboxes, inputs, etc.)
  }

  applyFilter() {
    // Implement logic to apply the filter based on form values
    // You can use filterForm.value to access the form values
    this.showFilter = false;
  }
}
