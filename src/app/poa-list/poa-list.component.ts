import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { catchError, throwError } from 'rxjs';
import { propertyInterface } from '../interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-poa-list',
  templateUrl: './poa-list.component.html',
})
export class PoaListComponent implements OnInit {
  isModalLoading = true;
  filteredData: propertyInterface[] = [];
  typeOfPoa = "temp";
  items = ['All', 'Land', 'Estate'];
  selectedItem = 'All';
  dropdownOpen = false;
  selected = false;
  main_data: propertyInterface[] = [];
  poaProperties: string[] = [];
  selectedCard: propertyInterface | null = null;

  constructor(private mainService: MainService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get typeOfPoa from query params
    this.route.queryParams.subscribe(params => {
      this.typeOfPoa = params['type_of_poa'] || 'temp';
    });

    this.fetchData();
  }

  fetchData(): void {
    this.isModalLoading = true;

    this.mainService.getAuthUserProperty()
      .pipe(
        catchError((error) => {
          console.error('Error fetching auth data:', error);
          return throwError(() => new Error('Something went wrong'));
        })
      ).subscribe((data: propertyInterface[]) => {
        this.main_data = data;
        this.isModalLoading = false;
      });

    this.mainService.getPOA()
      .pipe(
        catchError((error) => {
          console.error('Error fetching POA data:', error);
          return throwError(() => new Error('Something went wrong'));
        })
      ).subscribe((data: any) => {
        this.poaProperties = data.map((datum: any) => datum["property_id"]["id"]);
        this.isModalLoading = false;
      });
  }

  selectCard(card: propertyInterface): void {
    console.log(card);
    if (card.id && this.poaProperties.includes(card.id)) {
      return;
    }
    this.selected = true;
    this.selectedCard = card;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectItem(item: string) {
    this.selectedItem = item;
    this.dropdownOpen = false;
  }

  addToPOA(item: propertyInterface | null) {
    if (!item) return;
    this.isModalLoading = true;

    const data = {
      property_id: item.id,
      type_of_poa: this.typeOfPoa
    };

    this.mainService.createPOA(data)
      .pipe(
        catchError((error) => {
          this.isModalLoading = false;
          console.error('Unknown error:', error);
          return throwError(() => new Error('Something went wrong'));
        })
      )
      .subscribe((data: propertyInterface) => {
        this.selectedCard = data;
        console.log(data);
        if (data.id) {
          this.poaProperties.push(data.id);
          this.fetchData();  // Refresh the data
        }
        this.isModalLoading = false;
      });

    this.selected = false;
  }

  cancel() {
    this.selected = false;
  }
}
