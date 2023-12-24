import { Component, Input } from '@angular/core';
import { propertyInterface } from '../interfaces/interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styles: ``
})
export class PostComponent {
@Input() selectedCard : propertyInterface | null = null
}
