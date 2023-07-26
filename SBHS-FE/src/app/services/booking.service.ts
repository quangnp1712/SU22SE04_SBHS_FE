import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root'
})

export class ServerHttpService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' :  'Bearer '+ localStorage.getItem('userToken')
    })
  };
  public model: any = {};
  private REST_API_SERVER = 'http://localhost:8080';
  constructor(private httpClient: HttpClient) { }
  public getHomestayName(){
    const url = `${this.REST_API_SERVER}/api/homestay/permit-all/owner-list`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  public getListHomestay(name: string) {
    const url = `${this.REST_API_SERVER}/api/booking/booking-list/`+name+`?status=all`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  public confirmHomestay(requestId : string, isAccepted:boolean,rejectMessage:string){
    var value = {
      isAccepted,rejectMessage
    }
    const url =`${this.REST_API_SERVER}/api/booking/confirm/`+requestId+``;
    return this.httpClient
    .patch<any>(url,value,this.httpOptions)
    .pipe(catchError(this.handleError));
  }
  public getBookingDetail() {
    const url = `${this.REST_API_SERVER}/api/booking/permit-all/get/`+localStorage.getItem("id")+``;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  public checkIn(bookingId:string){
    const url = `${this.REST_API_SERVER}/api/booking/checkin`;
    var value ={
      bookingId
    }
    return this.httpClient
      .post<any>(url, value,this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    return throwError(
      error.error["message"]);
  };

}
