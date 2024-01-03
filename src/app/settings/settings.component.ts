import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styles: ``
})
export class SettingsComponent {
  isModal = false
  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document,
  ) { }
  logout() {
    console.log(this.doc.location.origin);
    
    this.auth.logout(
      { logoutParams: { returnTo: this.doc.location.origin } }
      );
  }

  openModal(){
    this.isModal = true
  }
  closeModal(){
this.isModal = false
  }
}
