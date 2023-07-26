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
  public getRequestHomestay(status: string) {
    const url = `${this.REST_API_SERVER}/api/request/homestay/list/`+status+``;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  public verifyHomestay(requestId : string, isAccepted:boolean,rejectMessage:string){
    var value = {
      isAccepted,rejectMessage
    }
    const url =`${this.REST_API_SERVER}/api/request/verification/homestay/`+requestId+``;
    return this.httpClient
    .patch<any>(url,value,this.httpOptions)
    .pipe(catchError(this.handleError));
  }
  public getRequestHomestayDetail(){
    const url = `${this.REST_API_SERVER}/api/request/homestay/`+localStorage.getItem("id")+``;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    return throwError(
      error.error["message"]);
  };

}
