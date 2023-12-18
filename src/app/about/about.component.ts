import { Component } from '@angular/core';
import { FabComponent } from '../fab/fab.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [FabComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
