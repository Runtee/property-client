import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FabComponent } from './fab/fab.component';
import { TrendingComponent } from './trending/trending.component';
import { AboutComponent } from './about/about.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FilterComponent } from './filter/filter.component';
import { ProfileComponent } from './profile/profile.component';
import { SavedComponent } from './saved/saved.component';
import { SearchComponent } from './search/search.component';
import { SettingsComponent } from './settings/settings.component';
import { UploadComponent } from './upload/upload.component';
import { UploadMediaComponent } from './upload-media/upload-media.component';
import { PostComponent } from './post/post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BackComponent } from './back/back.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { PropertyItemComponent } from './property-item/property-item.component';
import { PropertyPostComponent } from './property-post/property-post.component';
import { HttpClientModule } from '@angular/common/http';

import { AuthModule } from '@auth0/auth0-angular';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { Trending2Component } from './trending2/trending2.component';
import { PreviewComponent } from './preview/preview.component';
import { NavComponent } from './nav/nav.component';
import { UploadTextComponent } from './upload-text/upload-text.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TopbarComponent } from './topbar/topbar.component';
import { InvoiceWarningComponent } from './invoice-warning/invoice-warning.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceAwaitingComponent } from './invoice-awaiting/invoice-awaiting.component';
import { AllDoneComponent } from './all-done/all-done.component';
import { MypropertyComponent } from './myproperty/myproperty.component';
import { PurchaseConfirmationComponent } from './purchase-confirmation/purchase-confirmation.component';
import { KycSelectComponent } from './kyc-select/kyc-select.component';
import { KycUploadComponent } from './kyc-upload/kyc-upload.component';
import { KycVideoComponent } from './kyc-video/kyc-video.component';
import { ClaimRewardComponent } from './claim-reward/claim-reward.component';
import { KycComponent } from './kyc/kyc.component';
import { SupportComponent } from './support/support.component';
import { EmailTagsComponent } from './email-tag/email-tag.component';
import { NotifyCardComponent } from './notify-card/notify-card.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { ModalComponent } from './modal/modal.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';
import { TrendWarningComponent } from './trend-warning/trend-warning.component';
import { TrendAwaitingComponent } from './trend-awaiting/trend-awaiting.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FabComponent,
    TrendingComponent,
    AboutComponent,
    ChangePasswordComponent,
    FilterComponent,
    ProfileComponent,
    SavedComponent,
    SearchComponent,
    SettingsComponent,
    UploadComponent,
    UploadMediaComponent,
    PostComponent,
    BackComponent,
    SearchInputComponent,
    PropertyItemComponent,
    PropertyPostComponent,
    OnboardingComponent,
    Trending2Component,
    PreviewComponent,
    NavComponent,
    UploadTextComponent,
    NotificationsComponent,
    TopbarComponent,
    InvoiceWarningComponent,
    InvoiceComponent,
    InvoiceAwaitingComponent,
    AllDoneComponent,
    MypropertyComponent,
    PurchaseConfirmationComponent,
    KycSelectComponent,
    KycUploadComponent,
    KycVideoComponent,
    ClaimRewardComponent,
    KycComponent,
    SupportComponent,
    EmailTagsComponent,
    NotifyCardComponent,
    UpdatePostComponent,
    EditPostComponent,
    ModalComponent,
    TrendWarningComponent,
    TrendAwaitingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ClipboardModule,
    ReactiveFormsModule,
    // Import the module into the application, with configuration
    AuthModule.forRoot({
      ...env.auth,
      httpInterceptor: {
        allowedList: [
          {
            uri: 'https://property-production.up.railway.app/*',
            allowAnonymous: true,
          },
        ], // Allow all requests under http://localhost:8000
      },
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: ' http://127.0.0.1:8000/',
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
