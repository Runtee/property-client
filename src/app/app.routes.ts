import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PaymentComponent } from './payment/payment.component';
import { UploadComponent } from './upload/upload.component';
import { UploadMediaComponent } from './upload-media/upload-media.component';
import { SearchComponent } from './search/search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { FilterComponent } from './filter/filter.component';
import { SavedComponent } from './saved/saved.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

export const routes: Routes = [
    { path: "", component: AboutComponent },
    { path: "home", component: HomeComponent },
    { path: "about", component: AboutComponent },
    { path: "payment", component: PaymentComponent },
    { path: "upload", component: UploadComponent },
    { path: "upload-media", component: UploadMediaComponent },
    { path: "search", component: SearchComponent },
    { path: "search-result", component: SearchResultsComponent },
    { path: "filter", component: FilterComponent },
    { path: "saved", component: SavedComponent },
    {path: "profile", component: ProfileComponent},
    {path: "settings", component: SettingsComponent},
    {path: "change-password", component: ChangePasswordComponent},
    
    
];
