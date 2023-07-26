import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServerHttpService } from 'src/app/services/verify-landlord.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../../pop-up/message/message.component';
import { SuccessComponent } from '../../pop-up/success/success.component';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit {
  values: data[] = [];
  message!: string;
  public status = 'All';
  registerError: string = '';
  constructor(private http: ServerHttpService, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.getStatusLandlord();
  }
  public getStatusLandlord() {
    this.http.getLanlord(this.status).subscribe(
      (data) => {
        this.values = data;
        console.log('data', this.values);
      },
      (error) => {
        console.log(error)
      }
    );
  }
  public Id = 0;
  public createBy = '';
  public isAccept = true;
  public isReject = false;
  public rejectMessage = '';
  public onItemSelector(id: number, createdBy: string) {
    this.Id = id;
    localStorage.setItem('id', id + '');
    localStorage.setItem('createdBy', createdBy);
  }
  public accept() {
    this.http
      .verifyLandlord(this.Id + '', this.isAccept, this.rejectMessage)
      .subscribe(
        (data) => {
          if (data != null) {
            this.message = 'Account have accept';
            this.openDialogSuccess();
            location.reload();
          }

          console.log(data);
        },
        (error) => {
          if (error['status'] == 500) {
            this.registerError = 'please check your information again!';
            this.message = this.registerError;
            this.openDialog();
          } else {
            this.registerError = error;
            this.message = error;
            this.openDialog();
          }
        }
      );
  }
  public reject() {
    this.http
      .verifyLandlord(this.Id + '', this.isReject, this.rejectMessage)
      .subscribe(
        (data) => {
          if (data != null) {
            this.message = 'Account have reject';
            this.openDialogSuccess();
            location.reload();
          }
        },
        (error) => {
          if (error['status'] == 500) {
            this.registerError = 'please check your information again!';
            this.message = this.registerError;
            this.openDialog();
          } else {
            this.registerError = error;
            this.message = error;
            this.openDialog();
          }
        }
      );
  }

  title = 'pagination';
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];

  onTableDataChange(event: any) {
    this.page = event;
    this.values;
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.values;
  }
  // dialog error
  openDialog() {
    this.dialog.open(MessageComponent, {
      data: this.message,
    });
  }
  openDialogSuccess() {
    this.dialog.open(SuccessComponent, {
      data: this.message,
    });
  }
}

export interface data {
  createdBy: string;
  id: number;
  createdDate: string;
  type: string;
  status: string;
}
