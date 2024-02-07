import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../main.service';
import { catchError, finalize, throwError } from 'rxjs';
import { notificationInterface } from '../interfaces/interfaces';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent {
  isLoading = false;
  notifications: notificationInterface[] = [];
  constructor(private router: Router, private mainService: MainService) {}
  ngOnInit(): void {
    this.mainService
      .getNotification()
      .pipe(
        catchError((error) => {
          console.error('Error fetching notification data:', error);
          return throwError(() => new Error('Something went wrong'));
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((notify: notificationInterface[]) => {
        this.notifications = notify;
      });
  }
}
