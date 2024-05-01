import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-kyc-complete',
  templateUrl: './kyc-complete.component.html',
  styleUrl: './kyc-complete.component.css'
})
export class KycCompleteComponent {
  isSuccess = false
  isFailed = false

  constructor(
    private route: ActivatedRoute,
    
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const selectedTab = params['status'] 
      if (selectedTab == "completed"){
        this.isSuccess = true
      }
      else{
        this.isFailed = true
      }
    });
  }

}
