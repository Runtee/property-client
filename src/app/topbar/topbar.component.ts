import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styles: ``
})
export class TopbarComponent {
@Input () item: string = ""
}
