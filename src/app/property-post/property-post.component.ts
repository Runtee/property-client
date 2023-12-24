import { Component, OnInit } from '@angular/core';
import { propertyInterface } from '../interfaces/interfaces';
import { data } from "../data"
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-property-post',
  templateUrl: './property-post.component.html',
  styleUrl: './property-post.component.css'
})
export class PropertyPostComponent implements OnInit{
  main_data: propertyInterface[] = data;
  filteredData: propertyInterface[] = [];
  selectedCard: propertyInterface | null = null;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const itemId = params.get('id');
      if (itemId) {
        this.selectedCard = this.main_data.find(item => item.id === itemId) || null;
      }
    });
    this.filteredData = data
  }


  // // Handle card selection
  selectCards(card: propertyInterface): void {
    this.selectedCard = card;
  }
}
