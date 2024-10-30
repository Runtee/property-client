import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../main.service';
import { propertyInterface } from '../interfaces/interfaces';

@Component({
  selector: 'app-poa',
  templateUrl: './poa.component.html',
})
export class PoaComponent implements OnInit {
  selectedTab: string = 'Temporary';
  poaProperties: any[] = [];
  filteredProperties: propertyInterface[] = [];
  isModalLoading = true;
  
  constructor(private router: Router, private mainService: MainService) {}

  ngOnInit(): void {
    this.fetchPoaData();
  }

  fetchPoaData(): void {
    this.mainService.getPOA().subscribe({
      next: (data: any[]) => {
        this.poaProperties = data;
        this.filterProperties();
        this.isModalLoading = false

      },
      error: (error) => {
        console.error('Error fetching POA data:', error);
      },
      complete: () => { /* Optional: Handle completion if needed */ }
    });
  }

  filterProperties(): void {
    this.filteredProperties = []
    this.poaProperties.filter(poa => {
      if (this.selectedTab === 'Temporary' && poa.type_of_poa === 'temporary'){
         poa.type_of_poa === '"permate"'
         this.filteredProperties.push(poa["property_id"])
      }
      else if(this.selectedTab === 'Permanent' && poa.type_of_poa === 'permanent'){
        this.filteredProperties.push(poa["property_id"])
      }

    }

      // this.selectedTab === 'Temporary' ? poa.type_of_poa === 'Temporary' : poa.type_of_poa === 'Permanent'
    );
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
    this.filterProperties();
  }

  selectCard(card: propertyInterface): void {
    console.log(card);
    // Navigate to the property details page if needed
    // this.router.navigate(['/property', card.id, card.user_id]);
  }

  goToAddPOA(){
    this.router.navigate(['/poa-add'], { queryParams: { type_of_poa: this.selectedTab.toLowerCase() } }); // Update URL query params
  }
}
