import { Component, OnInit } from '@angular/core';
import { ForgetPasswordService } from '../services/forget-password.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageService } from '../services/image.service';
import { RequiredValidator } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  public comfirmPassword=""  ;
  public username = "";
  public otp = "";
  public newPassword = "";
  constructor(private http: ForgetPasswordService , private router: Router,private aRoute: ActivatedRoute, private imageService:ImageService) { }

  ngOnInit(): void {
  }

  public getOtp() {
    console.log(this.username)
    this.http.inputUserName(this.username).subscribe((data => {

    }),
    error =>{
      alert(error)
    })
  }
  public inputOtp() {
    console.log(this.username)
    this.http.inputOTP(this.username,this.otp).subscribe((data => {

    }),
    error =>{
      alert(error)
    })
  }
  public inputPassword() {
    console.log(this.username)
    this.http.inputPassword(this.username, this.newPassword).subscribe((data => {

    }),
    error =>{
      alert(error)
    })
  }

}
