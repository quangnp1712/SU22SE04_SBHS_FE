import { Component, OnInit ,Inject} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import { ServerHttpService } from 'src/app/services/homestay.service';
import { MessageComponent } from '../message/message.component';
import { SuccessComponent } from '../success/success.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-delete-homestay-dialog',
  templateUrl: './delete-homestay-dialog.component.html',
  styleUrls: ['./delete-homestay-dialog.component.scss']
})
export class DeleteHomestayDialogComponent  {

  message :any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: string ,public dialog: MatDialog, private http: ServerHttpService) {      }

  deleteHomestay(){
    console.log(this.data);
    this.http.deleteHomestay(this.data).subscribe((data =>{
      this.message = 'Delete Success'
      this.openDialogSuccess();
    }),
    error =>{
      this.message = error;
      this.openDialog();
    })
  }
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
