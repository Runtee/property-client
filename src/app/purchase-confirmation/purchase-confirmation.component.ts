import { Component, ElementRef, ViewChild } from '@angular/core';
import { MainService } from '../main.service';
import { ActivatedRoute } from '@angular/router';
import { propertyInterface } from '../interfaces/interfaces';

@Component({
  selector: 'app-purchase-confirmation',
  templateUrl: './purchase-confirmation.component.html',
  styles: ``,
})
export class PurchaseConfirmationComponent {
  isAwaiting: boolean = false;
  isComplete: boolean = false;
  isConfirmation: boolean = true;
  selectedFile: any = null;
  type: string = '';
  isAgreed: boolean = false;
  propertyId: string | null = '';
  userid: string | null = '';
  optype: string = ""
  isModalLoading = true

  @ViewChild('fileInput') fileInput!: ElementRef; // Initialize with '!' operator

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.type = params['type'];
      if (this.type=="seller") {
        this.optype = "buyer"
      } else {
        this.optype="seller"
      }
      console.log(this.type);
    });
    this.route.paramMap.subscribe((params) => {
      this.propertyId = params.get('id');
      this.userid = params.get('userid')
    });
    if (this.propertyId && this.userid) {
      this.mainService.getPropertyById(this.propertyId, this.userid).subscribe({
        next: (response: propertyInterface) => {
          if (this.type === "seller" && response.marked_done_by_seller) {
            this.isConfirmation = false;
            this.isAwaiting = true;
            this.isModalLoading = false

          }
          if (this.type === "buyer" && response.marked_done_by_buyer) {
            this.isConfirmation = false;
            this.isAwaiting = true;
            this.isModalLoading = false

          }
          if (response.marked_done_by_buyer && response.marked_done_by_seller) {
            this.isConfirmation = false;
            this.isAwaiting = false;
            this.isComplete = true;
            this.isModalLoading = false

            if (response.status !== "sold" && this.propertyId) {
              this.mainService.updateProperty(this.propertyId, { title: response.title, status: "sold" }).subscribe({
                next: (response: any) => {
                  console.log("done", response);

                },
                error: (error) => {
                  console.error('Error updating property', error);

                }
              })
            }
          }

          console.log('data', response);
        },
        error: (error) => {
          // Handle file submission errors
          console.error('Error submitting file:', error);
        },
      });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    // Process the selected file here (e.g., upload to server)
    console.log('Selected file:', this.selectedFile);
  }

  constructor(
    private mainService: MainService,
    private route: ActivatedRoute
  ) { }
  onConfirm() {
    if (!this.propertyId) return
    if (this.selectedFile && this.isAgreed) {
      this.isModalLoading = true
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      formData.append('type_of_client', this.type);
      console.log(formData);
      
      this.mainService.submitFile(this.propertyId, formData).subscribe({
        next: (response) => {
          // Handle successful file submission
          this.isConfirmation = false;
          this.isAwaiting = true;
          console.log('File submitted successfully:', response);
          this.isModalLoading = false
        },
        error: (error) => {
          // Handle file submission errors
          console.error('Error submitting file:', error);
          this.isModalLoading = false

        },
      });
    } else {
      // Handle missing file or unchecked checkbox
      this.isModalLoading = false

      console.error('Please select a file and agree to the terms.');
    }
  }
}
