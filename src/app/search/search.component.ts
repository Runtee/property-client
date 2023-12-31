import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { data } from "../data";
import { propertyInterface } from '../interfaces/interfaces';
import { MainService } from '../main.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  main_data: propertyInterface[] = [];
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

  constructor(private router: Router, private mainService: MainService) {
    this.mainService.getProperties()
      .pipe(
        catchError((error) => {
          console.error('Error fetching trending data:', error);
          return throwError(() => new Error('Something went wrong')); // Rethrow for proper handling
        })
      ).subscribe((trendings: propertyInterface[]) => {
        this.main_data = trendings;
      });

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
  
    // Check if the input is a valid property link
    const isPropertyLink = this.isValidPropertyLink(this.searchTerm);
  
    if (isPropertyLink) {
      // If it's a valid property link, extract the property ID and navigate
      const propertyId = this.extractPropertyIdFromLink(this.searchTerm);
      this.router.navigate(['/property', propertyId]);
    } else {
      // If it's not a valid property link, perform the regular search
      this.searchResults = this.main_data.filter((suggestion) =>
        suggestion.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.showResults = true;
      this.showHistory = false;
      this.showSuggestions = false;
    }
  }
  
  isValidPropertyLink(link: string): boolean {
    // Use a regular expression to check if the link matches the expected format
    const propertyLinkRegex = /^(?:https?:\/\/)(?:localhost:4200|proclan\.com)\/property\/([a-f0-9-]+)$/;
  
    return propertyLinkRegex.test(link);
  }
  
  extractPropertyIdFromLink(link: string): string {
    // Extract the property ID from the link using a regular expression
    const match = link.match(/\/property\/([a-f0-9-]+)$/);
    return match ? match[1] : '';
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
