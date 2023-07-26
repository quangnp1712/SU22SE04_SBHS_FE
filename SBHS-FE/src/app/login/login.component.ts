import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ServerHttpService } from '../services/login.service';
// import {JwtHelperService} from '@auth0/angular-jwt';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  registerError: string = '';
  public userName = '';
  public password = '';
  public registerSuccessTmp = localStorage.getItem('registerSuccess');
  registerSuccess: boolean = false;
  constructor(
    private http: ServerHttpService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    if (this.registerSuccessTmp == 'true') {
      this.registerSuccess = true;
      localStorage.setItem('registerSuccess', 'false');
    }
  }
  public getProfile() {
    console.log(localStorage.getItem('registerSuccess'));
    this.http.login(this.userName, this.password).subscribe(
      (data) => {
        localStorage.setItem('userToken', data['token']);
        localStorage.setItem('username', data['username']);
        if (data['roles'][0]['authority'] === 'ROLE_LANDLORD') {
          this.router.navigate(['/Landlord/Dashboard'], {
            relativeTo: this.route,
          });
        } else
          this.router.navigate(['/Admin/Request'], { relativeTo: this.route });
      },
      (error) => {
        if (error['status'] == 500) {
          this.registerError = 'please check your information again!';
        } else {
          this.registerError = error;
          console.log(error);
        }
      }
    );
  }
}
