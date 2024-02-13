import { Component, ElementRef, ViewChild } from '@angular/core';
import { MainService } from '../main.service';
import { catchError, throwError } from 'rxjs';
import { propertyInterface, userInterface } from '../interfaces/interfaces';
// import { AuthService } from '@auth0/auth0-spa-js';
import { AuthService,User } from '@auth0/auth0-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: ``
})
export class ProfileComponent {
  editOn = false
  isLoading = true;
  user: User | null = null
  main_data: propertyInterface[] = []

  constructor(
    private mainService: MainService,
    private authService: AuthService) { }
  ngOnInit(): void { 
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        // Get user profile data
        this.authService.user$.subscribe((user) => {
          if(user){
            this.user = user
          }
          // this.user = user;
        });
      }
    });
    

    // Fetch trending data when the component is initialized
    this.mainService.getAuthUserProperty()
      .pipe(
        catchError((error) => {
          console.error('Error fetching trending data:', error);
          return throwError(() => new Error('Something went wrong')); // Rethrow for proper handling
        })
      ).subscribe((data: propertyInterface[]) => {
        this.main_data = data;
        this.isLoading = false;
      });
  }
  // updateProfile(updatedData: userInterface) {
  //   // Call your backend API to update user profile data
  //   // (e.g., using HttpClient or a dedicated service)
  //   this.authService.user$({ ...updatedData }).subscribe(
  //     () => {
  //       // Update local user object and display success message
  //       this.user = { ...this.user, ...updatedData };
  //     },
  //     error => {
  //       // Handle update errors gracefully
  //     }
  //   );
  // }

  edit() {
    this.editOn = !this.editOn
  }
  save() {
    this.editOn = !this.editOn
  }

  cancel() {
    this.editOn = !this.editOn
  }

}
