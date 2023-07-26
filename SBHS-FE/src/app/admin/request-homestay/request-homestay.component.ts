import { Component, OnInit } from '@angular/core';
import { ServerHttpService } from 'src/app/services/verify-homestay.service';
import { MessageComponent } from '../../pop-up/message/message.component';
import { SuccessComponent } from '../../pop-up/success/success.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-request-homestay',
  templateUrl: './request-homestay.component.html',
  styleUrls: ['./request-homestay.component.scss']
})
export class RequestHomestayComponent implements OnInit {
  values : data[] = [];
  public status ="All";
  message!: string;
  registerError: string ="";
  constructor(private http: ServerHttpService,public dialog: MatDialog) {
  }
  ngOnInit(): void {
   this.getStatusHomestay();
  }
  public getStatusHomestay(){
    this.http.getRequestHomestay(this.status).subscribe((data =>{
      this.values = data;
    }),
    error =>{
      console.log(error);
    })
  }
  public Id = 0;
  public isAccept = true;
  public isReject = false;
  public rejectMessage = "";
  public onItemSelector(value :number) {
        this.Id=value;
        localStorage.setItem("id",value+"")
    }
  public accept(){
    this.http.verifyHomestay(this.Id +"",this.isAccept,this.rejectMessage).subscribe((data =>{
      if(data !=null){
        this.message = 'Homestay have accept';
            this.openDialogSuccess();
        location.reload();
      }

      console.log(data)
    }),
    error =>{
      this.message = error;
            this.openDialog();
    })
  }
  public reject(){
    this.rejectMessage = "not enough condition"
    this.http.verifyHomestay(this.Id +"",this.isReject,this.rejectMessage).subscribe((data =>{
      if(data !=null){
        this.message = 'Homestay have reject';
            this.openDialogSuccess();
        location.reload();
      }
    }),
    error =>{
      if (error['status'] == 500) {
        this.registerError = 'please check your information again!';
        this, (this.message = this.registerError);
        this.openDialog();
      } else {
        this.registerError = error;
        this.message = error;
        this.openDialog();
      }
    })
  }
  title ='pagination';
  page: number=1;
  count:number=0;
  tableSize: number = 5;
  tableSizes: any = [5,10,15,20];

  onTableDataChange(event: any){
    this.page = event;
    this.values;
  }
  onTableSizeChange(event: any): void{
    this.tableSize = event.target.value;
    this.page=1;
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
