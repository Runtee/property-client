import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notify-card',
  templateUrl: './notify-card.component.html',
  styles: ``
})

export class NotifyCardComponent implements OnInit {
  showCard: boolean = true;
  @Input() title: string = ""
  @Input() description: string = ""
  ngOnInit(): void {
    setTimeout(() => {
      this.hideCard();
    }, 4000);
  }

  hideCard() {
    this.showCard = false;
  }
}
