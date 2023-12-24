import { Component, EventEmitter, Input, Output } from '@angular/core';
import { propertyInterface } from '../interfaces/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-item',
  templateUrl: './property-item.component.html',
})
export class PropertyItemComponent {
@Input() item: propertyInterface | null = null

constructor(private router: Router) { }


selectCard(card: propertyInterface): void {
  this.router.navigate(['/property', card.id]);
}
}
