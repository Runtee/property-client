import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../main.service';
import { catchError, of, throwError } from 'rxjs';
import { propertyInterface } from '../interfaces/interfaces';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-trend-warning',
  templateUrl: './trend-warning.component.html',
  styles: '',
})
export class TrendWarningComponent implements OnInit {
  id: string | null = '';
  userid: string | null = '';
  selectedCard : null | propertyInterface= null; 
  isModalLoading = true;
  showMessage = false;
  messageTitle = '';
  description = '';
  canPay = false
  is404 = false;
  // selectedItem: propertyInterface| null = null

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mainService: MainService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.userid = params.get('userid');
    });
    if(!this.id || !this.userid){
      return
    }
    this.mainService
          .getPropertyById(this.id, this.userid)
          .pipe(
            catchError((error) => {
              if (error instanceof HttpErrorResponse && error.status === 404) {
                this.is404 = true;
              } else {
                console.error('Error fetching property data:', error);
                return throwError(() => new Error('Something went wrong'));
              }
              return of(null);
            })
          )
          .subscribe((item: propertyInterface | null) => {
            if (item !== null) {
              this.selectedCard = item;
              console.log(this.selectedCard?.c_of_o && this.selectedCard.kyc)
              if (this.selectedCard?.c_of_o && this.selectedCard.kyc) {
                this.canPay = true
              }
              this.isModalLoading =false
              
            }
          });
           
  }

  confirmPayment() {
    this.isModalLoading = true;
    const currentDomain = window.location.origin;
    const link = `${currentDomain}/trending-confirm`;

    const data = {
      property_id: this.id,
      payment_channel: 'paystack',
      clone_id: this.userid,
      type_of_transaction: 'trending',
      callback: link,
    };

    this.mainService
      .makePayment(data)
      .pipe(
        catchError((error) => {
          this.isModalLoading = false;
          this.showMessage = true;
          this.messageTitle = 'Error';
          this.description = 'Error in initializing payment';
          setTimeout(() => {
            this.showMessage = false;
          }, 5000);
          console.error('Error in initializing payment:', error);
          return throwError(() => new Error('Something went wrong')); // Rethrow for proper handling
        })
      )
      .subscribe((data: any) => {
        this.isModalLoading = false;
        console.log('Payment response:', data);
        let redirectUrl: string;
        const paystackUrl = data.data.payment_response.data.authorization_url;
        console.log(paystackUrl);
        redirectUrl = paystackUrl;
        window.open(redirectUrl, '_self');
      });
  }
}
