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
import { FormsModule } from '@angular/forms';
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
    UploadTextComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ClipboardModule,

    // Import the module into the application, with configuration
    AuthModule.forRoot({
      domain: 'dev-hzf3gl655z7ry503.uk.auth0.com',
      clientId: 'ENL5BwciHFv5T54x9dykwTjbWCY57TPh',
      authorizationParams: {
        redirect_uri: window.location.origin
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
