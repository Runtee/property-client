import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MainService } from '../main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meta-map',
  templateUrl: './meta-map.component.html',
})
export class MetaMapComponent {
  title = 'Venta';
  clientid = '6618133abc16f0001d3352cc';
  flowid = '6618133a966ade001d07c294';

  @Input() propertyId: string = "";

  constructor(private http: HttpClient, private mainService: MainService, private router: Router) { }
  
  handleVerificationComplete(detail: any) {
    if (this.propertyId) {
      this.mainService.kycProperty(this.propertyId).subscribe({
        next: (response) => {
          console.log('Kyc Property Response:', response);
          this.router.navigate(['/property/complete'], { queryParams: { status: 'completed' } });
        },
        error: (error) => {
          console.error('Kyc Property Error:', error);
        }
      });
    } else {
      console.error('Property ID is missing');
    }
  }

  handleVerificationCanceled(detail: any) {
    // Correct usage of router.navigate with query parameters
    this.router.navigate(['/property/complete'], { queryParams: { status: 'failed' } });
    console.log("Verification canceled");
  }
}
