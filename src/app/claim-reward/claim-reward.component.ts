import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../main.service';
import { catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { propertyInterface } from '../interfaces/interfaces';

@Component({
  selector: 'app-claim-reward',
  templateUrl: './claim-reward.component.html',
  styles: ``,
})
export class ClaimRewardComponent implements OnInit {
  claimForm: FormGroup;
  showForm: boolean = true;
  showPreview = false;
  propertyId: string | null = null;
  userid: string | null = null;
  clonerAccountExists = false;
  loading = false
  showMessage: boolean = false;
  messageTitle: string = '';
  description: string = '';

  constructor(
    private fb: FormBuilder,
    private mainService: MainService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.claimForm = this.fb.group({
      account_name: ['', [Validators.required]],
      account_number: ['', [Validators.required]],
      bank_name: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.propertyId = params.get('id');
      this.userid = params.get('userid');

      if (this.propertyId && this.userid) {
        this.mainService
          .getPropertyById(this.propertyId, this.userid)
          .pipe(
            catchError((error) => {
              error('Error fetching property data:', error);
              return throwError(() => new Error('Something went wrong'));
            })
          )
          .subscribe((item: propertyInterface | null) => {
            if (
              item !== null &&
              item.cloner_account_number &&
              item.cloner_account_name &&
              item.cloner_bank_name
            ) {
              this.clonerAccountExists = true;
            } else {
              this.clonerAccountExists = false;
            }
          });
      }
    });
  }

  onConfirm() {
    if(!this.propertyId) return
    this.loading = true
    const data = {...this.claimForm, email: "admin@gmail.com"}
    this.mainService
      .addClonerAccountDetails(this.propertyId,data)
      .pipe(
        catchError((error) => {
          this.loading = false
          this.showMessage = true;
          this.messageTitle = 'Error';
          this.description = 'Error adding cloner account details';
          console.error('Error adding cloner account details:', error);
          setTimeout(() => {
            this.showMessage = false;
          }, 5000);
          return [];
        })
      )
      .subscribe(() => {
        this.loading = false
        this.clonerAccountExists = true;
      });
  }

  onSubmit() {
    // Mark all form controls as touched
    this.markFormGroupTouched(this.claimForm);
    if (this.claimForm.valid) {
      this.showForm = false;
      this.showPreview = true;
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    // Mark each FormControl in the form group as touched
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        // Recursive call for nested form groups
        this.markFormGroupTouched(control);
      }
    });
  }
}
