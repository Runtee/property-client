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

const routes: Routes = [
  { path: '', component: OnboardingComponent },
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'home2',
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
    path: 'upload-media',
    component: UploadMediaComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'upload-preview',
    component: PreviewComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'filter',
    component: FilterComponent,
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
    // canActivate: [AuthGuard],
  },
  {
    path: 'profile/settings',
    component: SettingsComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'profile/change-password',
    component: ChangePasswordComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'property/:id',
    component: PropertyPostComponent,
    // canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
