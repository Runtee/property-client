import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../main.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-trend-awaiting',
  templateUrl: './trend-awaiting.component.html',
  styles: []
})
export class TrendAwaitingComponent implements OnInit {
  isDone = false;
  errormess = "";

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const reference = params["reference"];

      this.mainService.verifyPayment(reference)
      .pipe(
        catchError(error => {
            console.error("Error verifying payment:", error);
            this.errormess = "An error occurred while verifying payment"; // Handle API errors gracefully
            return throwError(() => new Error('Something went wrong'));
          
        })
      )
      .subscribe((data) => {
        this.isDone = true;
        console.log('payment successful!',data);
      })

    });
  }

  constructor(private route: ActivatedRoute, private mainService: MainService) {}
}
