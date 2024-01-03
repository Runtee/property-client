import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.css'
})
export class OnboardingComponent {
  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document,
    private router: Router
  ) { }
  profileJson = ""

  ngOnInit(): void {
    
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      console.log(isAuthenticated);
      
      if (isAuthenticated) {
        this.router.navigate(['/home']);
      }
    });
    
  }
  


  loginWithRedirect() {
    this.auth.loginWithRedirect()
  }
}
