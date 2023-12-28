import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: ``
})
export class ProfileComponent {
editOn = false

edit(){
  this.editOn = !this.editOn
}
save(){
  this.editOn = !this.editOn

}

cancel(){
  this.editOn = !this.editOn

}

}
