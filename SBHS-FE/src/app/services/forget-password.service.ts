import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  private REST_API_SERVER = 'http://localhost:8080';
  constructor(private HttpClient: HttpClient) { }

  // Step 1 Forget Password
  public inputUserName(username : string){

    const url =`${this.REST_API_SERVER}/api/user/otp/`+username+``;
    return this.HttpClient
    .get<any>(url,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  //  Step 2 Forget Pasword
  public inputOTP(userInfo: string, userOtp : string){
    var value = {
      userInfo,userOtp
    }
    // url api thieu user name
    const url =`${this.REST_API_SERVER}/api/user/otp/confirmation`;
    return this.HttpClient
    .post<any>(url,value ,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  // Step 3 Forget Password
  public inputPassword(userInfo:string, newPassword : string ){
    var value = {
      userInfo,
      newPassword
    }
    // url api thieu user name
    const url =`${this.REST_API_SERVER}/api/user/password/modification`;
    return this.HttpClient
    .post<any>(url,value ,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // if (error.error instanceof ErrorEvent) {
    //   // A client-side or network error occurred. Handle it accordingly.
    //   console.error('An error occurred:', error.error.message);
    // } else {
    //   // The backend returned an unsuccessful response code.
    //   // The response body may contain clues as to what went wrong,
    //   console.error(
    //     `Backend returned code ${error.status}, ` +
    //     `body was: ${error.error}`);
    // }
    // // return an observable with a user-facing error message
    return throwError(
      error.error["message"]);
  };

}
