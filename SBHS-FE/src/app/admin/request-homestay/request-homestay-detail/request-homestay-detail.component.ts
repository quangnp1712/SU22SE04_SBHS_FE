import { Component, OnInit } from '@angular/core';
import { ServerHttpService } from 'src/app/services/verify-homestay.service';
import { ImageService } from '../../../services/image.service';
import { Editor, Toolbar } from 'ngx-editor';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../../../pop-up/message/message.component';
import { SuccessComponent } from '../../../pop-up/success/success.component';

@Component({
  selector: 'app-request-homestay-detail',
  templateUrl: './request-homestay-detail.component.html',
  styleUrls: ['./request-homestay-detail.component.scss']
})
export class RequestHomestayDetailComponent implements OnInit {
  message!: string;
  createdBy :string =""
  createdByEmail :string =""
  createdDate :string =""
  type :string =""
  status :string =""
  homestayName :string =""
  numberOfRoom :string =""
  price :string =""
  city :string =""
  checkInTime :string =""
  checkOutTime :string =""
  address :string =""
  description :string =""
  imageLicenseUrl :string =""
  homestayImagesList : string[] = []
  homestayFacilityList: any
  homestayAftercareList: any
  public isAccept = true;
  public isReject = false;
  public rejectMessage = "";
  imageUrl:string =""
  registerError: string ="";
  constructor(public dialog: MatDialog,private http: ServerHttpService,private image: ImageService) { }

  // richtext
  editor!: Editor;
  html!: '';
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  ngOnInit(): void {
    this.editor = new Editor();
    this.http.getRequestHomestayDetail().subscribe(async (data) =>{
      this.createdBy = data["createdBy"]
      this.homestayName = data["homestayName"]
      this.createdByEmail = data["createdByEmail"]
      this.numberOfRoom = data["numberOfRoom"]
      this.price = data["price"]
      this.city = data["city"]
      this.checkInTime = data["checkInTime"]
      this.checkOutTime = data["checkOutTime"]
      this.address = data["address"]
      this.description = data["description"]

      this.imageLicenseUrl = await this.image.getImage ( 'license/' + data["imageLicenseUrl"])

      for(let i of data["homestayImagesList"]){
        this.imageUrl = await this.image.getImage('homestay/' + i.url);
        console.log('image name:' , i.url);
        console.log('image url' , this.imageUrl);
        this.homestayImagesList.push(this.imageUrl);
      }
      // this.homestayImagesList = data["homestayImagesList"]

      this.homestayAftercareList = data["homestayAftercareList"]
      this.homestayFacilityList= data["homestayFacilityList"]
      console.log(data)
      console.log('check out' , this.checkOutTime)
      console.log('check in' , this.checkInTime)
    })
  }


  public accept(){
    this.http.verifyHomestay(localStorage.getItem("id") +"",this.isAccept,this.rejectMessage).subscribe((data =>{
      if(data !=null){
        this.message = 'Homesaty have accept';
            this.openDialogSuccess();
        location.reload();
      }

      console.log(data)
    }),
    error =>{
      if (error['status'] == 500) {
        this.registerError = 'please check your information again!';
        this.message = this.registerError;
        this.openDialog();
      } else {
        this.registerError = error;
        this.message = error;
        this.openDialog();
      }
    })
  }
  public reject(){
    this.rejectMessage = "not enough condition"
    this.http.verifyHomestay(localStorage.getItem("id") +"",this.isReject,this.rejectMessage).subscribe((data =>{
      if(data !=null){
        this.message = 'Homestay have reject';
            this.openDialogSuccess();
        location.reload();
      }
    }),
    error =>{
      if (error['status'] == 500) {
        this.registerError = 'please check your information again!';
        this.message = this.registerError;
        this.openDialog();
      } else {
        this.registerError = error;
        this.message = error;
        this.openDialog();
      }
    })
  }
  // dialog error
  openDialog() {
    this.dialog.open(MessageComponent, {
      data: this.message,
    });
  }
  openDialogSuccess() {
    this.dialog.open(SuccessComponent, {
      data: this.message,
    });
  }
}
