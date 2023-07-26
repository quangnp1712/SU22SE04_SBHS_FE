import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandlordComponent } from './landlord.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterHomestayComponent } from './homestay/register-homestay/register-homestay.component';
import { ProfileComponent } from './profile/profile.component';
import { BookingComponent } from './booking/booking.component';
import { BookingDetailComponent } from './booking/booking-detail/booking-detail.component';
import { HomestayComponent } from './homestay/homestay.component';

import { HomestayDetailComponent } from './homestay/homestay-detail/homestay-detail.component';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import { UpdateHomestayComponent } from './homestay/update-homestay/update-homestay.component';

const routes: Routes = [
  {
    path: '',
    component: LandlordComponent,
    children: [
      { path: 'Dashboard', component: DashboardComponent },
      { path: 'Profile', component: ProfileComponent },
      { path: 'Booking', component: BookingComponent },
      {
        path: 'Booking',
        children: [
          { path: 'BookingDetail', component: BookingDetailComponent },
        ],
      },
      { path: 'Homestay', component: HomestayComponent },
      {
        path: 'Homestay',
        children: [
          { path: 'RegisterHomestay', component: RegisterHomestayComponent },
          { path: 'HomestayDetail', component: HomestayDetailComponent },
          { path: 'UpdateHomestay', component: UpdateHomestayComponent },
        ],
      },
      { path: 'ForgetPassword', component: ForgetPasswordComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandlordRoutingModule {}
