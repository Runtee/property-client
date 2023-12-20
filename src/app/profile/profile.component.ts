import { Component } from '@angular/core';
import { FabComponent } from '../fab/fab.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FabComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
