// import { Injectable } from "@angular/core";
// import { ActivatedRoute, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
// import { KycComponent } from "./kyc/kyc.component";
// import { Observable } from "rxjs";

// @Injectable({ providedIn: 'root' })
// export class KycGuard {
//   constructor(private kycService: KycService) {}

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     // Check if previous steps are completed
//     return this.kycService.isStepCompleted(currentStep);
//   }

//   canDeactivate(component: KycComponent): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     // Confirm unsaved data
//     if (component.hasUnsavedData) {
//       return confirm('There are unsaved changes. Are you sure you want to leave?');
//     }
//     return true;
//   }
// }

