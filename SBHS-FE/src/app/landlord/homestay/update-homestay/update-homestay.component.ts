import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { empty, Observable } from 'rxjs';
import { Editor, Toolbar } from 'ngx-editor';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageComponent } from '../../../pop-up/message/message.component';
import { SuccessComponent } from '../../../pop-up/success/success.component';
import { ServerHttpService } from 'src/app/services/homestay.service';

interface City {
  value: string;
}
@Component({
  selector: 'app-update-homestay',
  templateUrl: './update-homestay.component.html',
  styleUrls: ['./update-homestay.component.scss'],
})
export class UpdateHomestayComponent implements OnInit {
  // entity
  homestayImageFiles: File[] = [];
  homestayLicenseFiles: File[] = [];
  file!: File;
  value: any =[];
  public homestayLicense!: string;
  public homestayImages: string[] = [];
  readonly = false;
  ListSpecialDay: any[] = [];
  newServices: any[] = [];
  newFacility: any[] = [];
  registerError: string = '';
  oParser = new DOMParser();
  oDOM!: any;
  text!: any;

  // constructor
  constructor(
    private _formBuilder: FormBuilder,
    private http: ServerHttpService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    public dialog: MatDialog
  ) {}

  // ngOnInit
  ngOnInit(): void {
    this.editor = new Editor();
    this.editor2 = new Editor();
    this.http.getHomestayDetail().subscribe(async (data) => {
      this.value = data;
      console.log(data);
      console.log(this.value.name);
      console.log("this.value", this.value);




      // for (this.i of this.value.homestayImages) {
      //   this.imgUrl = await this.image.getImage('homestay/' + this.i.url);
      //   this.homestayImage.push({ url: this.imgUrl });
      //   console.log('image', this.imgUrl);
      // }
      // this.homestayLicense = await this.image.getImage(
      //   'homestay/' + this.value.homestayLicense.url
      // );

      this.getHomestaySpecialDay();
      this.informationFormGroup.patchValue({
        homestayName:this.value.name
      })

    });


  }

  // Format Month
  valueMonthName: Array<string> = [
    'January ',
    'February ',
    'March ',
    'April ',
    'May ',
    'June ',
    'July',
    'August',
    'September',
    'October',
    'November ',
    'December ',
  ];

  // API Google Map
  formattedaddress = ' ';
  options = {
    types: ['address'],
    componentRestrictions: {
      country: ['VN'],
    },
  } as unknown as Options;
  public handleAddressChange(address: any) {
    //setting address from API to local variable
    this.formattedaddress = address.formatted_address;
    console.log('address', address);
  }

  // richtext
  editor!: Editor;
  editor2!: Editor;
  descriptionStep4!: any;
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

  setNgeditorToString() {
    this.oDOM = this.oParser.parseFromString(
      this.informationFormGroup.controls.description.value!,
      'text/html'
    );
    this.text = this.oDOM.body.innerText;
    console.log('text', this.text);
    this.descriptionStep4 =
      this.informationFormGroup.controls.description.value!;
  }

  ngOnDestroy(): void {
    this.editor.destroy();
    this.editor2.destroy();
  }

  //  City
  cities: City[] = [
    { value: 'TP.HCM' },
    { value: 'TP.Da Lat' },
    { value: 'TP.Ha Noi' },
    { value: 'Quang Nam' },
    { value: 'Vung Tau' },
    { value: 'TP.Da Nang' },
  ];

  // dialog error
  openDialog() {
    this.dialog.open(MessageComponent, {
      data: this.registerError,
    });
  }
  openDialogSuccess() {
    this.dialog.open(SuccessComponent, {
      data: this.registerError,
    });
  }

  // information Form
  informationFormGroup = this._formBuilder.group({
    homestayName: ['', Validators.required],
    address: ['', Validators.required],
    checkInTime: ['', Validators.required],
    checkOutTime: ['', Validators.required],
    priceNormalDay: ['', Validators.required],
    priceWeekendDay: ['', Validators.required],
    number: ['', Validators.required],
    description: [''],
    image: [false, Validators.requiredTrue],
  });

  getHomestaySpecialDay() {
    for (let item of this.value.homestayPriceList) {
      if (item.type == 'special') {
        this.ListSpecialDay.push(item);
        console.log('list homestay', this.ListSpecialDay);
      }
    }
    this.http.getSpecialDay().subscribe((data) => {
      for (let items of data) {
        for (let specialDay of this.ListSpecialDay) {
          if (items.id !== specialDay.id) {
            this.ListSpecialDay.push(items );
          }
        }
      }
      // this.ListSpecialDay = data
      console.log('fianl list', this.ListSpecialDay);
    });


  }

  // Image

  // lấy file hình
  onSelectImageHomestay(files: any) {
    console.log('onselect: ', files);
    // set files
    this.homestayImageFiles.push(...files.addedFiles);
    if (
      this.homestayImageFiles.length >= 1 &&
      this.homestayLicenseFiles.length == 1
    ) {
      this.informationFormGroup.patchValue({ image: true });
    } else {
      this.informationFormGroup.patchValue({ image: false });
    }
  }

  // xóa file hình
  onRemoveHomestayImage(event: File) {
    console.log(event);
    this.homestayImageFiles.splice(this.homestayImageFiles.indexOf(event), 1);
    console.log('xoa file:', this.homestayImageFiles);
    if (
      this.homestayImageFiles.length >= 1 &&
      this.homestayLicenseFiles.length == 1
    ) {
      this.informationFormGroup.patchValue({ image: true });
    } else {
      this.informationFormGroup.patchValue({ image: false });
    }
  }
  onRemoved() {
    for (this.file of this.homestayImageFiles) {
      this.homestayImageFiles.splice(
        this.homestayImageFiles.indexOf(this.file),
        this.homestayImageFiles.length
      );
    }
    for (this.file of this.homestayLicenseFiles) {
      this.homestayLicenseFiles.splice(
        this.homestayLicenseFiles.indexOf(this.file),
        this.homestayLicenseFiles.length
      );
    }
  }

  // lấy file hình
  onSelectHomestayLicense(files: any) {
    console.log('onselect: ', files);
    // set files
    this.homestayLicenseFiles.push(...files.addedFiles);
    console.log('file array', this.homestayLicenseFiles);
    console.log('file lenght', this.homestayLicenseFiles.length);

    if (this.homestayLicenseFiles.length > 1) {
      this.homestayLicenseFiles.splice(
        this.homestayLicenseFiles.indexOf(files),
        1
      );
      console.log('file lenght slice', this.homestayLicenseFiles.length);
      console.log('file array', this.homestayLicenseFiles);
      console.log('file index', this.homestayLicenseFiles.indexOf(files));
    }
    if (
      this.homestayImageFiles.length >= 1 &&
      this.homestayLicenseFiles.length == 1
    ) {
      this.informationFormGroup.patchValue({ image: true });
    } else {
      this.informationFormGroup.patchValue({ image: false });
    }
  }

  // xóa file hình
  onRemoveHomestayLicense(event: File) {
    console.log(event);
    console.log('xoa index:', this.homestayLicenseFiles.indexOf(event));
    this.homestayLicenseFiles.splice(
      this.homestayLicenseFiles.indexOf(event),
      1
    );
    console.log('xoa file:', this.homestayLicenseFiles);
    if (
      this.homestayImageFiles.length >= 1 &&
      this.homestayLicenseFiles.length == 1
    ) {
      this.informationFormGroup.patchValue({ image: true });
    } else {
      this.informationFormGroup.patchValue({ image: false });
    }
  }

  informationForm() {
    console.log(this.informationFormGroup.value);
    // console.log("homestay license", this.homestayLicense);
    // console.log('homestay image', this.homestayImages);

    // console.log('lít special day', this.ListSpecialDay);

    this.oDOM = this.oParser.parseFromString(
      this.informationFormGroup.controls.description.value!,
      'text/html'
    );
    this.text = this.oDOM.body.innerText;
    console.log('text', this.text);
    this.descriptionStep4 =
      this.informationFormGroup.controls.description.value!;

  }

  // facility Form
  facilityFormGroup = this._formBuilder.group({
    tv: false,
    inputTv: [0],
    bed: false,
    inputBed: [0],
    sofa: false,
    inputSofa: [0],
    fan: false,
    inputFan: [0],
    cookingStove: false,
    inputCookingStove: [0],
    shower: false,
    inputShower: [0],
    toilet: false,
    inputToilet: [0],
    bathtub: false,
    inputBathtub: [0],
  });

  getHomestayCommonFacilities() {
    for (let item of this.value.homestayCommonFacilities) {
      if (item.name == 'Tv') {
        this.facilityFormGroup.patchValue({
          tv: true,
          inputTv: item.amount,
        });
      } else if (item.name == 'CookingStove') {
        this.facilityFormGroup.patchValue({
          cookingStove: true,
          inputCookingStove: item.amount,
        });
      } else if (item.name == 'Bed') {
        this.facilityFormGroup.patchValue({
          bed: true,
          inputBed: item.amount,
        });
      } else if (item.name == 'Shower') {
        this.facilityFormGroup.patchValue({
          shower: true,
          inputShower: item.amount,
        });
      } else if (item.name == 'Sofa') {
        this.facilityFormGroup.patchValue({
          sofa: true,
          inputSofa: item.amount,
        });
      } else if (item.name == 'Toilet') {
        this.facilityFormGroup.patchValue({
          toilet: true,
          inputToilet: item.amount,
        });
      } else if (item.name == 'Fan') {
        this.facilityFormGroup.patchValue({
          fan: true,
          inputFan: item.amount,
        });
      } else if (item.name == 'Bathtub') {
        this.facilityFormGroup.patchValue({
          bathtub: true,
          inputBathtub: item.amount,
        });
      }
    }
  }

  getHomestayAdditionFacilities() {
    for (let item of this.value.homestayAdditionalFacilities) {
      this.newFacility.push({
        name: item.name,
        amount: item.amount,
        status: true,
      });
    }
  }

  // new Facility
  addFacility() {
    this.newFacility.push({ name: '', amount: '', status: false });
    // console.log('values', this.newFacility);
    // console.log('size', this.newFacility.length);
  }

  removeFacility(i: any) {
    this.newFacility.splice(i, 1);
    // console.log('delete', this.newFacility.length + i);
  }

  resetFacility(): void {
    this.newFacility = [];
    // console.log(this.newFacility);
  }

  //  service Form
  serviceFormGroup = this._formBuilder.group({
    wifi: false,
    wifiPrice: [{ value: '', disabled: true }],
    food: false,
    foodPrice: [{ value: '', disabled: true }],
    bar: false,
    barPrice: [{ value: '', disabled: true }],
    swimming: false,
    swimmingPrice: [{ value: '', disabled: true }],
    spa: false,
    spaPrice: [{ value: '', disabled: true }],
    fishing: false,
    fishingPrice: [{ value: '', disabled: true }],
    carRental: false,
    carRentalPrice: [{ value: '', disabled: true }],
    campfire: false,
    campfirePrice: [{ value: '', disabled: true }],
  });

  getHomestayServices() {
    for (let item of this.value.homestayServices) {
      if (item.name == 'Wifi') {
        this.serviceFormGroup.patchValue({
          wifi: true,
          wifiPrice: item.price,
        });
      } else if (item.name == 'Spa') {
        this.serviceFormGroup.patchValue({
          spa: true,
          spaPrice: item.price,
        });
      } else if (item.name == 'Food') {
        this.serviceFormGroup.patchValue({
          food: true,
          foodPrice: item.price,
        });
      } else if (item.name == 'Fishing') {
        this.serviceFormGroup.patchValue({
          fishing: true,
          fishingPrice: item.price,
        });
      } else if (item.name == 'Bar') {
        this.serviceFormGroup.patchValue({
          bar: true,
          barPrice: item.price,
        });
      } else if (item.name == 'CarRental') {
        this.serviceFormGroup.patchValue({
          carRental: true,
          carRentalPrice: item.price,
        });
      } else if (item.name == 'Swimming') {
        this.serviceFormGroup.patchValue({
          swimming: true,
          swimmingPrice: item.price,
        });
      } else if (item.name == 'Campfire') {
        this.serviceFormGroup.patchValue({
          campfire: true,
          spaPrice: item.price,
        });
      } else {
        this.newServices.push({
          name: item.name,
          price: item.price,
          status: true,
        });
      }
    }
  }




  facilityForm() {
    console.log(this.facilityFormGroup.value);
  }
  serviceForm() {
    console.log(this.serviceFormGroup.value);
  }
  paymentForm() {      }



  paymentFormGroup = this._formBuilder.group({});


  // New Service
  addService() {
    this.newServices.push({ name: '', price: '', status: false });
    console.log('values', this.newServices);
    console.log('size', this.newServices.length);
  }

  removeService(i: any) {
    this.newServices.splice(i, 1);
  }

  resetService(): void {
    this.newServices = [];
    console.log(this.newServices);
  }
}
