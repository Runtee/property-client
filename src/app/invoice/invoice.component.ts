import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../main.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styles: ``
})
export class InvoiceComponent {
  @ViewChild('invoice') invoice!: ElementRef; // Use the correct name here

  id : string | null= '';
  userid : string | null= '';

  constructor(private router: Router, private route: ActivatedRoute, private mainService: MainService) {}

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
  confrimPayment(){
    this.router.navigate(['/purchase/invoice-awaiting', this.id, this.userid]);
  }
}
