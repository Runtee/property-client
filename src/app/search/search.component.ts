import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { data } from "../data";
import { propertyInterface } from '../interfaces/interfaces';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  main_data: propertyInterface[] = data;
  searchHistory: string[] = ['Ubollo', 'Enugu'];
  suggestions: string[] = [];
  searchResults: propertyInterface[] = [];
  showHistory: boolean = true;
  showSuggestions: boolean = false;
  showResults: boolean = false;
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

  openFilterScreen() {
    this.showSearch = false;
    this.showFilter = true;
  }

  closeFilterScreen() {
    this.showSearch = true;
    this.showFilter = false;
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
    this.showResults = false;

    if (searchTerm) {
      this.showHistory = false;
      this.showSuggestions = true;
      this.suggestions = this.main_data.filter((suggestion) =>
        suggestion.title.toLowerCase().includes(searchTerm.toLowerCase())
      ).map((suggestion) => suggestion.title);
    } else {
      this.showSuggestions = false;
    }
  }

  onSearch(event: any) {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm = inputElement.value.trim();
    this.searchResults = this.main_data.filter((suggestion) =>
      suggestion.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.showResults = true;
    this.showHistory = false;
    this.showSuggestions = false;
  }

  onSuggestionClick(suggestion: string) {
    this.searchTerm = suggestion;
    this.onSearch({ target: { value: suggestion } });
  }

  onHistoryClick(history: string) {
    this.searchTerm = history;
    this.onSearch({ target: { value: history } });
  }
}
