import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CdkTableModule } from '@angular/cdk/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { RequestComponent } from './request/request.component';
import { RequestAccountComponent } from './request/request-detail/request-account/request-account.component';
import { MatButtonModule } from '@angular/material/button';
import { RequestHomestayComponent } from './request-homestay/request-homestay.component';
import { RequestHomestayDetailComponent } from './request-homestay/request-homestay-detail/request-homestay-detail.component';
import { MatStepperModule } from '@angular/material/stepper';
import { SpecialDayComponent } from './special-day/special-day.component';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxEditorModule } from 'ngx-editor';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    RequestComponent,
    RequestAccountComponent,
    RequestHomestayComponent,
    RequestHomestayDetailComponent,
    SpecialDayComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    NgxDropzoneModule,
    CdkTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSortModule,
    MatButtonModule,
    MatStepperModule,
    NgxPaginationModule,
    MatIconModule,
    MatExpansionModule,
    MatSelectModule,
    MatRippleModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    NgxEditorModule,
    MatCheckboxModule,
    MatRadioModule,
    NgxEchartsModule.forRoot({ echarts: () => import('echarts') }),
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
  ],
})
export class AdminModule {}
