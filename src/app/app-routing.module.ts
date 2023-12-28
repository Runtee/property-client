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

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"about",component:AboutComponent},
  {path:"search",component:SearchComponent},
  // { path: "payment", component: PaymentComponent },
  { path: "upload", component: UploadComponent },
  { path: "upload-media", component: UploadMediaComponent },
  { path: "filter", component: FilterComponent },
  { path: "saved", component: SavedComponent },
  {path: "profile", component: ProfileComponent},
  {path: "profile/settings", component: SettingsComponent},
  {path: "profile/change-password", component: ChangePasswordComponent},
  {path:"property/:id",component:PropertyPostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
