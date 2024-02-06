import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../main.service';
import { propertyInterface } from '../interfaces/interfaces';

@Component({
  selector: 'app-myproperty',
  templateUrl: './myproperty.component.html',
  styles: ''
})
export class MypropertyComponent implements OnInit {
  selectedTab: string = 'sold';
  soldProperties: propertyInterface[] = [];
  cloneProperties: propertyInterface[] = [];
  boughtProperties: propertyInterface[] = [];

  constructor(
    private mainService: MainService,
    private route: ActivatedRoute,
    private router: Router,
    
  ) {}

  ngOnInit() {
    this.fetchProperties('sold'); // Call getSoldProperties on load
    this.route.queryParams.subscribe(params => {
      const selectedTab = params['tab'] || 'sold'; // Get tab from query params or default to 'sold'
      this.fetchProperties(selectedTab);
      this.selectedTab = selectedTab;
    });
  }

  selectTab(tab: string) {
    this.fetchProperties(tab);
    this.router.navigate([], { queryParams: { tab } }); // Update URL query params
  }

  fetchProperties(tab: string) {
    switch (tab) {
      case 'sold':
        this.mainService.getSoldProperties().subscribe(properties => this.soldProperties = properties);
        break;
      case 'cloned':
        this.mainService.getClonedProperties().subscribe(properties => this.cloneProperties = properties);
        break;
      case 'bought':
        this.mainService.getBoughtProperties().subscribe(properties => this.boughtProperties = properties);
        break;
      default:
        // Handle invalid tab selection
    }
  }
}
