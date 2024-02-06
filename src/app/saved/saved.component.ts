import { Component } from '@angular/core';
import { propertyInterface } from '../interfaces/interfaces';
import { data } from '../data';
import { MainService } from '../main.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styles: ``
})
export class SavedComponent {
  savedProperty : propertyInterface[] = []
  isLoading = true
  constructor(private mainService: MainService) {}
  ngOnInit(): void {
  this.mainService.getUserSaveProperties()
  .pipe(
    catchError((error) => {
      console.error('Error fetching trending data:', error);
      return throwError(() => new Error('Something went wrong')); // Rethrow for proper handling
    })
  ).subscribe((saved: any[]) => {
    this.savedProperty = saved.map((data) => data.property_id);
    this.isLoading = false;
  }); 
}
}
