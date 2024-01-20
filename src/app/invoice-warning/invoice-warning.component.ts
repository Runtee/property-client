import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../main.service';

@Component({
  selector: 'app-invoice-warning',
  templateUrl: './invoice-warning.component.html',
  styles: ''
})
export class InvoiceWarningComponent implements OnInit {
  id : string | null= '';
  userid : string | null= '';

  constructor(private router: Router, private route: ActivatedRoute, private mainService: MainService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.userid = params.get('userid');
    });
  }
}
