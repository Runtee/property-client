import { Component, OnInit } from '@angular/core';
import { propertyInterface } from '../interfaces/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../main.service';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-property-post',
  templateUrl: './property-post.component.html',
  styleUrls: ['./property-post.component.css']
})
export class PropertyPostComponent implements OnInit {
  main_data: propertyInterface[] = [];
  filteredData: propertyInterface[] = [];
  selectedCard: propertyInterface | null = null;
  isLoading = true;

  constructor(private router: Router, private route: ActivatedRoute, private mainService: MainService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const itemId = params.get('id');
      if (itemId) {
        this.mainService.getPropertyById(itemId)
          .pipe(
            catchError((error) => {
              console.error('Error fetching property data:', error);
              return throwError(() => new Error('Something went wrong'));
            })
          )
          .subscribe((item: propertyInterface) => {
            this.selectedCard = item;
          });
      }
    });

    this.mainService.getTrendings()
      .pipe(
        catchError((error) => {
          console.error('Error fetching trending data:', error);
          return throwError(() => new Error('Something went wrong'));
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((trendings: propertyInterface[]) => {
        this.main_data = trendings;
        this.filteredData = this.main_data;
      });
  }

  // Handle card selection
  selectCards(card: propertyInterface): void {
    this.selectedCard = card;
  }
}
