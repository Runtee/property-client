import { Component } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { propertyInterface } from '../interfaces/interfaces';
import { MainService } from '../main.service';
import { HttpClient } from '@angular/common/http';
import { AuthService, User } from '@auth0/auth0-angular';

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
  token : string = ""
  isModalLoading = true;


  constructor(
    private mainService: MainService,
    private authService: AuthService,
    private http: HttpClient,
    ) { }
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
    this.authService.getAccessTokenSilently().subscribe(data=>this.token=data)
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
        this.isModalLoading = false
      });
    
  }

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
