import { Component } from '@angular/core';
import { propertyInterface } from '../interfaces/interfaces';
import { data } from '../data';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styles: ``
})
export class SavedComponent {
  savedProperty : propertyInterface[] = data.slice(0,3);

}
