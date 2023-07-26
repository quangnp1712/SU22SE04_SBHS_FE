import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ServerHttpService } from 'src/app/services/homestay.service';
import { DeleteHomestayDialogComponent } from '../../pop-up/delete-homestay-dialog/delete-homestay-dialog.component';
import { ImageService } from '../../services/image.service';


@Component({
  selector: 'app-homestay',
  templateUrl: './homestay.component.html',
  styleUrls: ['./homestay.component.scss']
})
export class HomestayComponent implements OnInit {

  constructor( private image: ImageService,public dialog: MatDialog, private http: ServerHttpService) { }
  value : any[]=[];
  i : any;
  isDelete = "null"
  ngOnInit(): void {
    this.http.getHomestayList().subscribe(async  (data) =>{
      // this.value = data;
      // for(this.i of this.value ){
      //   console.log(this.i.homestayImages[0].url)
      // }
      for(this.i of data){

        var imgUrl = await this.image.getImage('homestay/' + this.i.homestayImages[0].url)
        this.value.push({imgURL:imgUrl, name:this.i.name, id:this.i.id })
        console.log(imgUrl);
      }

    })

  }
  getHomestayName(name: string){
    localStorage.setItem('homestayName',name);
  }
  id: string =""
  getHomestayId(id: string){
    this.id = id
  }
  deleteHomestay(){
    this.http.deleteHomestay(this.id).subscribe((data =>{
      this.isDelete = "true"
    }),
    error =>{
      this.isDelete = "false"
    })
  }
  openDialog() {
    this.dialog.open(DeleteHomestayDialogComponent,{
      data : this.id
    });

  }

}


