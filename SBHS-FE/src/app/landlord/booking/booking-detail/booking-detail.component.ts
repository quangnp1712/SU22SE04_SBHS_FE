import { Component, OnInit } from '@angular/core';
import { ServerHttpService } from 'src/app/services/booking.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../../../pop-up/message/message.component';
import { SuccessComponent } from '../../../pop-up/success/success.component';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss']
})
export class BookingDetailComponent implements OnInit {
  message!: string;
  registerError: string="";
  constructor(private http: ServerHttpService, public dialog: MatDialog) { }
  passengerName: string =""
  passengerPhone: string =""
  passengerEmail: string =""
  homestayName: string =""
  homestayLocation: string =""
  homestayCity: string =""
  homestayOwner: string =""
  homestayServiceList : any
  checkIn: string =""
  checkOut: string =""
  totalPrice: string =""
  status: string =""
  deposit: string =""
  value :any[]=[];
  ngOnInit(): void {
    this.http.getBookingDetail().subscribe((data =>{
      this.homestayServiceList = data["homestayServiceList"]
      this.passengerName = data["passengerName"]
      this.passengerPhone = data["passengerPhone"]
      this.passengerEmail = data["passengerEmail"]
      this.homestayName = data["homestayName"]
      this.homestayLocation = data["homestayLocation"]
      this.homestayCity = data["homestayCity"]
      this.checkIn = data["checkIn"]
      this.checkOut = data["checkOut"]
      this.totalPrice = data["totalPrice"]
      this.deposit = data["deposit"]

      this.value = data;
      console.log(data);
      console.log(this.value);
    }))
  }
  public isAccept = true;
  public isReject = false;
  public rejectMessage = "";
  public accept(){
    this.http.confirmHomestay(localStorage.getItem("id") +"",this.isAccept,this.rejectMessage).subscribe((data =>{
      if(data !=null){
        this.message = 'Booking  have accept';
            this.openDialogSuccess();
            location.reload();
      }
      console.log(data)
    }),
    error =>{
      if (error['status'] == 500) {
        this.registerError = 'please check your information again!';
        this.message = this.registerError;
        this.openDialog();
      } else {
        this.registerError = error;
        this.message = error;
        this.openDialog();
      }
    })
  }
  public reject(){
    this.rejectMessage = "Homestay is maintained"
    this.http.confirmHomestay(localStorage.getItem("id") +"",this.isReject,this.rejectMessage).subscribe((data =>{
      if(data !=null){
        this.message = 'Booking have reject';
            this.openDialogSuccess();
            location.reload();
      }
    }),
    error =>{
      if (error['status'] == 500) {
        this.registerError = 'please check your information again!';
        this.message = this.registerError;
        this.openDialog();
      } else {
        this.registerError = error;
        this.message = error;
        this.openDialog();
      }
    })
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
