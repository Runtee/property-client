import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PaymentComponent } from './payment/payment.component';
import { UploadComponent } from './upload/upload.component';
import { UploadMediaComponent } from './upload-media/upload-media.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "about", component: AboutComponent },
    { path: "payment", component: PaymentComponent },
    { path: "upload", component: UploadComponent },
    { path: "upload-media", component: UploadMediaComponent },
    { path: "search", component: SearchComponent },
    
];
