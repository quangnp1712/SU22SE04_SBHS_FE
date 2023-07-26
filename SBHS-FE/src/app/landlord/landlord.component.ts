import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerHttpService } from 'src/app/services/profile.service';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-landlord',
  templateUrl: './landlord.component.html',
  styleUrls: ['./landlord.component.scss']
})
export class LandlordComponent implements OnInit {

  // imgae avatar
  public avatarUrl = '';


  constructor(private router: Router,private route: ActivatedRoute,private http: ServerHttpService,private image: ImageService) { }
  public username = localStorage.getItem("username");

  ngOnInit(): void {

    this.http.getProfile().subscribe(async (data) => {
        if(data['avatarUrl']){
        this.avatarUrl = await this.image.getImage(
          'avatar/' + data['avatarUrl']
        );
      }else{
        this.avatarUrl = await this.image.getImage('landlord/avatar/default.png');
      }
    });


  }
  public logout(){
    localStorage.clear();
    this.router.navigate(['/Login'], {relativeTo: this.route});
  }
}
