import { Component } from '@angular/core';
import { MainService } from '../main.service';
import { catchError, throwError } from 'rxjs';
import { propertyInterface } from '../interfaces/interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: ``
})
export class ProfileComponent {
editOn = false
isLoading = true;
main_data : propertyInterface[]= [] 
constructor(
  private mainService: MainService) {}
  ngOnInit(): void {
    // Fetch trending data when the component is initialized
      this.mainService.getAuthUserProperty()
        .pipe(
          catchError((error) => {
            console.error('Error fetching trending data:', error);
            return throwError(() => new Error('Something went wrong')); // Rethrow for proper handling
          })
        ).subscribe((data: propertyInterface[]) => {this.main_data = data;
          this.isLoading = false;
        });        
      }

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
