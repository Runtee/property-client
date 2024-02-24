import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../main.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styles: ``
})
export class InvoiceComponent {
  @ViewChild('invoice') invoice!: ElementRef; // Use the correct name here

  id: string | null = '';
  userid: string | null = '';

  constructor(private router: Router, private route: ActivatedRoute, private mainService: MainService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      // this.userid = params.get('userid');
    });
  }

  downloadInvoice() {

    // Access the element using the correct name
    const invoiceContent = this.invoice.nativeElement.innerHTML;
    print()
    // doc.html(invoiceContent, {
    //   callback: (doc) => {
    //     doc.save('invoice.pdf');
    //     console.log('done');

    //   }
    // });
  }
  
  confirmPayment() {
    const data = {
      property_id: this.id,
      payment_channel: "paystack",
      clone_id: this.userid
    };
  
    this.mainService.makePayment(data)
      .pipe(
        catchError((error) => {
          console.error('Error in initializing payment:', error);
          return throwError(() => new Error('Something went wrong')); // Rethrow for proper handling
        })
      )
      .subscribe((data: any) => {
        console.log('Payment response:', data);
        let redirectUrl: string;
        const paystackUrl = data.data.payment_response.data.authorization_url
        console.log(paystackUrl);
        redirectUrl = paystackUrl;
            window.open(redirectUrl, '_self')
        
          // if (data.payment_response && data.payment_response.data.authorization_url) {
          //   const paystackUrl = data.payment_response.authorization_url;
          //   redirectUrl = paystackUrl;
          //   window.open(redirectUrl)
          // }
        
       
      });
  }
}
