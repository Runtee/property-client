import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notify-card',
  templateUrl: './notify-card.component.html',
  styles: ``
})

export class NotifyCardComponent {
  @Input() title: string = ""
  @Input() description: string = ""
  
}
