import { Component, OnInit } from '@angular/core';
import { propertyInterface } from '../interfaces/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../main.service';
import { catchError, finalize } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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
  is404 = true;

  constructor(private router: Router, private route: ActivatedRoute, private mainService: MainService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const itemId = params.get('id');
      const userid = params.get('userid')
      if (itemId && userid) {
        this.mainService.getPropertyById(itemId, userid)
          .pipe(
          catchError((error) => {
            if (error instanceof HttpErrorResponse && error.status === 404) {
              this.is404 = true;              
            } else {
              console.error('Error fetching property data:', error);
              return throwError(() => new Error('Something went wrong'));
            }
            return of(null);
          })
        )
          .subscribe((item: propertyInterface | null) => {
          if (item !== null) {
            this.selectedCard = item;
          }
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
