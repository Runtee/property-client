import { Component } from '@angular/core';
import { propertyInterface } from '../interfaces/interfaces';
import { MainService } from '../main.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-trending2',
  templateUrl: './trending2.component.html',
  styles: ``
})
export class Trending2Component {
    main_data: propertyInterface[] = [];
    filteredData: propertyInterface[] = [];
    selectedCard: propertyInterface | null = null;
    isLoading: boolean = true;
  
    constructor(private mainService: MainService) {}
  
    ngOnInit(): void {
      // Fetch trending data when the component is initialized
        this.mainService.getTrendings()
          .pipe(
            catchError((error) => {
              console.error('Error fetching trending data:', error);
              return throwError(() => new Error('Something went wrong')); // Rethrow for proper handling
            })
          ).subscribe((trendings: propertyInterface[]) => {this.main_data = trendings;
            console.log(trendings)
            this.filteredData = this.main_data;
            if (this.filteredData.length > 0) {
              // this.selectedCard = this.filteredData[0];
            }
            this.isLoading = false;
          });        
        }
    
  
    // Handle card selection
    selectCard(card: propertyInterface): void {
      this.selectedCard = card;
    }
  }

