import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-all-done',
  templateUrl: './all-done.component.html',
  styles: ``
})
export class AllDoneComponent {
@Input() title : string = ""
@Input() image : string = ""
@Input() page_link : string = ""
@Input() page_to : string = ""
@Input() body : string = ""
}
