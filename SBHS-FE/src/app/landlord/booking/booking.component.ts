import { Component, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ServerHttpService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  title='pagination';
  POST:any;
  page: number = 1;
  count: number=0;
  tableSize: number = 5;
  tableSizes: any= [5,10,15,20];
  values : any;

  public name ="All";
  valueName:any;
  public Id = 0;
  public isAccept = true;
  public isReject = false;
  public rejectMessage = "Homestay đang bảo trì";
  registerError: string ="";
  constructor(private http: ServerHttpService) { }


  ngOnInit(): void {
    this.getRequestBookingByName();
    this.getHomestayName()
  }

  public getHomestayName(){
    this.http.getHomestayName().subscribe((data =>{
      this.valueName = data;
    }),
    error => {
      if(error["status"] == 500){
        this.registerError = "please check your information again!"
      }else this.registerError = error["message"]
    })
  }
  public onItemSelector(id: number) {
    this.Id=id;
    localStorage.setItem("id", id+"");
}

  public getRequestBookingByName(){
    this.http.getListHomestay(this.name).subscribe((data =>{
      this.values = data
      console.log(data)
    }),
    error =>{
      if(error["status"] == 500){
        this.registerError = "please check your information again!"
      }else this.registerError = error
    })
  }
  public accept(){
    this.http.confirmHomestay(this.Id +"",this.isAccept,this.rejectMessage).subscribe((data =>{
      if(data !=null){
        location.reload();
      }
      console.log(data)
    }),
    error =>{
      if(error["status"] == 500){
        this.registerError = "please check your information again!"
      }else this.registerError = error
    })
  }
  public reject(){
    this.http.confirmHomestay(this.Id +"",this.isReject,this.rejectMessage).subscribe((data =>{
      if(data !=null){
        location.reload();
      }
    }),
    error =>{
      if(error["status"] == 500){
        this.registerError = "please check your information again!"
      }else this.registerError = error
    })
  }

  public checkIn(){
    this.http.checkIn(this.Id +"").subscribe((data =>{
      if(data !=null){
        location.reload();
      }
    }),
    error =>{
      if(error["status"] == 500){
        this.registerError = "please check your information again!"
      }else this.registerError = error
    })
  }

  onTableDataChange(event: any){
    this.page = event;
    this.values;
  }
  onTableSizeChange(event: any): void{
    this.tableSize = event.target.value;
    this.page=1;
    this.values;
  }
}

