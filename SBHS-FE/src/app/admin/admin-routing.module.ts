import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { RequestComponent } from './request/request.component';
import { RequestAccountComponent } from './request/request-detail/request-account/request-account.component';
import { RequestHomestayComponent } from './request-homestay/request-homestay.component';
import { RequestHomestayDetailComponent } from './request-homestay/request-homestay-detail/request-homestay-detail.component';
import { SpecialDayComponent } from './special-day/special-day.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from '../landlord/profile/profile.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [

      { path: 'Request', component: RequestComponent },
      { path: 'Request', children: [
        { path: 'RequestAccount', component: RequestAccountComponent }
      ] },


      { path: 'RequestHomestay', component: RequestHomestayComponent},
      { path: 'RequestHomestay',  children:[
        { path: 'RequestHomestayDetail', component: RequestHomestayDetailComponent}
      ] },

      { path: 'SpecialDay', component: SpecialDayComponent },
      { path: 'Dashboard', component: DashboardComponent },
      { path: 'Profile', component: ProfileComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
