import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerHttpService } from 'src/app/services/profile.service';
import { ImageService } from '../services/image.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  public username = localStorage.getItem('username');
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: ServerHttpService,
    private image: ImageService
  ) {}
  public avatarUrl = '';
  ngOnInit(): void {
    this.http.getProfile().subscribe(async (data) => {
      console.log('avata',data['avatarUrl'] );
      if (data['avatarUrl']) {
        this.avatarUrl = await this.image.getImage(
          'admin/avatar/' + data['avatarUrl']
        );
      } else {
        this.avatarUrl = await this.image.getImage('admin/avatar/default.png');
      }
    });
  }
  public logout() {
    localStorage.clear();
    this.router.navigate(['/Login'], { relativeTo: this.route });
  }
}
