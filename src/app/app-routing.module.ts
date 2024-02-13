import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SearchComponent } from './search/search.component';
import { UploadComponent } from './upload/upload.component';
import { UploadMediaComponent } from './upload-media/upload-media.component';
import { FilterComponent } from './filter/filter.component';
import { SavedComponent } from './saved/saved.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PropertyPostComponent } from './property-post/property-post.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { Trending2Component } from './trending2/trending2.component';
import { PreviewComponent } from './preview/preview.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { InvoiceAwaitingComponent } from './invoice-awaiting/invoice-awaiting.component';
import { InvoiceWarningComponent } from './invoice-warning/invoice-warning.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { MypropertyComponent } from './myproperty/myproperty.component';
import { PurchaseConfirmationComponent } from './purchase-confirmation/purchase-confirmation.component';
import { KycSelectComponent } from './kyc-select/kyc-select.component';
import { KycVideoComponent } from './kyc-video/kyc-video.component';
import { KycComponent } from './kyc/kyc.component';
import { SupportComponent } from './support/support.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';

const routes: Routes = [
  { path: 'login', component: OnboardingComponent },
  
  {
    path: 'home',
    component: Trending2Component,
    // canActivate: [AuthGuard],
  },
  {
    path: '',
    component: Trending2Component,
    // canActivate: [AuthGuard],
  },
  {
    path: 'about',
    component: AboutComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'search',
    component: SearchComponent,
    // canActivate: [AuthGuard],
  },
  // { path: "payment", component: PaymentComponent },
  {
    path: 'upload',
    component: UploadComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'upload-preview',
    component: PreviewComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'saved',
    component: SavedComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile/settings',
    component: SettingsComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'settings/support',
    component: SupportComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'settings/change-password',
    component: ChangePasswordComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'property/:id/:userid',
    component: PropertyPostComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'purchase/invoice/:id/:userid',
    component: InvoiceComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'purchase/invoice-awaiting/:id/:userid',
    component: InvoiceAwaitingComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'purchase/complete/:id',
    component: PurchaseConfirmationComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'purchase/invoice-warning/:id/:userid',
    component: InvoiceWarningComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'notification',
    component: NotificationsComponent,
    // canActivate: [AuthGuard],
  },

  {
    path: 'my-property',
    component: MypropertyComponent,
    // canActivate: [AuthGuard],
  },

  {
    path: 'proprerty/kyc',
    component: KycComponent,
    // canActivate: [AuthGuard],
  },

  {
    path: 'purchase/invoice/:id/:userid',
    component: InvoiceComponent,
    // canActivate: [AuthGuard],
  },

  {
    path: 'kyc',
    component: KycVideoComponent,
    // canActivate: [AuthGuard],
  },

  {
    path: 'update-property/:id',
    component: UpdatePostComponent,
    // canActivate: [AuthGuard],
  },
  
  {
    path: 'edit-property/:id',
    component: EditPostComponent,
    // canActivate: [AuthGuard],
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
