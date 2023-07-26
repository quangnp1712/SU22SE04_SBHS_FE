import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServerHttpService {
  auheader = 'Bearer ' + localStorage.getItem('userToken');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.auheader,
    }),
  };
  public model: any = {};
  private REST_API_SERVER = 'http://localhost:8080';
  constructor(private httpClient: HttpClient) {}
  public registerLandlord(
    name: string,
    description: string,
    address: string,
    city: string,
    numberOfRoom: string,
    checkInTime: string,
    checkOutTime: string,
    homestayLicense: any,
    homestayImages: Array<any>,
    homestayServices: Array<any>,
    homestayCommonFacilities: Array<any>,
    homestayPriceList: Array<any>,
    homestayAdditionalFacilities: Array<any>
  ) {
    var value = {
      name,
      description,
      address,
      city,
      numberOfRoom,
      checkInTime,
      checkOutTime,
      homestayLicense,
      homestayImages,
      homestayServices,
      homestayCommonFacilities,
      homestayPriceList,
      homestayAdditionalFacilities,
    };
    console.log(value);
    const url = `${this.REST_API_SERVER}/api/homestay/register`;
    return this.httpClient
      .post<any>(url, value, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  public getSpecialDay() {
    const url = `${this.REST_API_SERVER}/api/homestay/get/all/special-day`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
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
    return throwError(error.error['message']);
  }

}
