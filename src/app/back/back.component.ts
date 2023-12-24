import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-back',
  templateUrl: './back.component.html',
  styleUrl: './back.component.css'
})
export class BackComponent {
  constructor(private location: Location) {}

  goBack(): void {
    
    this.location.back();
  }
}
