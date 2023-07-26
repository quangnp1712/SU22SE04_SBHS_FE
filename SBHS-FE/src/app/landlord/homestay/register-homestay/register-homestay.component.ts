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
import { ServerHttpService } from 'src/app/services/register-homestay.service';
import { finalize } from 'rxjs/operators';
import { empty, Observable } from 'rxjs';
import { Editor, Toolbar } from 'ngx-editor';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageComponent } from '../../../pop-up/message/message.component';
import { SuccessComponent } from '../../../pop-up/success/success.component';

interface City {
  value: string;
}
@Component({
  selector: 'app-register-homestay',
  templateUrl: './register-homestay.component.html',
  styleUrls: ['./register-homestay.component.scss'],
})
export class RegisterHomestayComponent implements OnInit {
  homestayImageFiles: File[] = [];
  homestayLicenseFiles: File[] = [];
  file!: File;
  value!: string;
  public homestayLicense!: string;
  public homestayImages: string[] = [];
  readonly = false;

  newServices: any[] = [];
  newFacility: any[] = [];

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
  oParser = new DOMParser();

  // new Facility
  addFacility() {
    this.newFacility.push({ name: '', amount: '', status: false });
    console.log('values', this.newFacility);
    console.log('size', this.newFacility.length);
  }

  removeFacility(i: any) {
    this.newFacility.splice(i, 1);
    console.log('delete', this.newFacility.length + i);
  }

  resetFacility(): void {
    this.newFacility = [];
    console.log(this.newFacility);
  }

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

  cities: City[] = [
    { value: 'TP.HCM' },
    { value: 'TP.Da Lat' },
    { value: 'TP.Ha Noi' },
    { value: 'Quang Nam' },
    { value: 'Vung Tau' },
    { value: 'TP.Da Nang' },
  ];

  informationFormGroup = this._formBuilder.group({
    homestayName: ['', Validators.required],
    address: ['', Validators.required],
    checkInTime: ['', Validators.required],
    checkOutTime: ['', Validators.required],
    priceNormalDay: ['', Validators.required],
    priceWeekendDay: ['', Validators.required],
    number: ['', Validators.required],
    city: [''],
    description: [''],
    image: [false, Validators.requiredTrue],
  });

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

  enableInputTV() {
    if (this.facilityFormGroup.controls.tv.value === true) {
      this.facilityFormGroup.controls.inputTv.enable();
      this.facilityFormGroup.patchValue({
        inputTv: 1,
      });
      console.log(this.facilityFormGroup.controls.inputTv.value);
    } else {
      this.facilityFormGroup.controls.inputTv.disable();
    }
  }
  enableInputBed() {
    if (this.facilityFormGroup.controls.bed.value === true) {
      this.facilityFormGroup.controls.inputBed.enable();
      this.facilityFormGroup.patchValue({
        inputBed: 1,
      });
    } else {
      this.facilityFormGroup.controls.inputBed.disable();
    }
  }
  enableInputSofa() {
    if (this.facilityFormGroup.controls.sofa.value === true) {
      this.facilityFormGroup.controls.inputSofa.enable();
      this.facilityFormGroup.patchValue({
        inputSofa: 1,
      });
    } else {
      this.facilityFormGroup.controls.inputSofa.disable();
    }
  }
  enableInputFan() {
    if (this.facilityFormGroup.controls.fan.value === true) {
      this.facilityFormGroup.controls.inputFan.enable();
      this.facilityFormGroup.patchValue({
        inputFan: 1,
      });
    } else {
      this.facilityFormGroup.controls.inputFan.disable();
    }
  }
  enableInputCookingStove() {
    if (this.facilityFormGroup.controls.cookingStove.value === true) {
      this.facilityFormGroup.controls.inputCookingStove.enable();
      this.facilityFormGroup.patchValue({
        inputCookingStove: 1,
      });
    } else {
      this.facilityFormGroup.controls.inputCookingStove.disable();
    }
  }
  enableInputShower() {
    if (this.facilityFormGroup.controls.shower.value === true) {
      this.facilityFormGroup.controls.inputShower.enable();
      this.facilityFormGroup.patchValue({
        inputShower: 1,
      });
    } else {
      this.facilityFormGroup.controls.inputShower.disable();
    }
  }
  enableInputToilet() {
    if (this.facilityFormGroup.controls.toilet.value === true) {
      this.facilityFormGroup.controls.inputToilet.enable();
      this.facilityFormGroup.patchValue({
        inputToilet: 1,
      });
    } else {
      this.facilityFormGroup.controls.inputToilet.disable();
    }
  }
  enableInputBathub() {
    if (this.facilityFormGroup.controls.bathtub.value === true) {
      this.facilityFormGroup.controls.inputBathtub.enable();
      this.facilityFormGroup.patchValue({
        inputBathtub: 1,
      });
    } else {
      this.facilityFormGroup.controls.inputBathtub.disable();
    }
  }

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

  enableInputWifi() {
    if (this.serviceFormGroup.controls.wifi.value === true) {
      this.serviceFormGroup.controls.wifiPrice.enable();
    } else {
      this.serviceFormGroup.controls.wifiPrice.disable();
      // this.facilityFormGroup.controls.inputTv.reset();
    }
  }
  enableInputFood() {
    if (this.serviceFormGroup.controls.food.value === true) {
      this.serviceFormGroup.controls.foodPrice.enable();
    } else {
      this.serviceFormGroup.controls.foodPrice.disable();
      // this.facilityFormGroup.controls.inputTv.reset();
    }
  }
  enableInputBar() {
    if (this.serviceFormGroup.controls.bar.value === true) {
      this.serviceFormGroup.controls.barPrice.enable();
    } else {
      this.serviceFormGroup.controls.barPrice.disable();
      // this.facilityFormGroup.controls.inputTv.reset();
    }
  }
  enableInputSwimming() {
    if (this.serviceFormGroup.controls.swimming.value === true) {
      this.serviceFormGroup.controls.swimmingPrice.enable();
    } else {
      this.serviceFormGroup.controls.swimmingPrice.disable();
      // this.facilityFormGroup.controls.inputTv.reset();
    }
  }
  enableInputSpa() {
    if (this.serviceFormGroup.controls.spa.value === true) {
      this.serviceFormGroup.controls.spaPrice.enable();
    } else {
      this.serviceFormGroup.controls.spaPrice.disable();
      // this.facilityFormGroup.controls.inputTv.reset();
    }
  }
  enableInputFishing() {
    if (this.serviceFormGroup.controls.fishing.value === true) {
      this.serviceFormGroup.controls.fishingPrice.enable();
    } else {
      this.serviceFormGroup.controls.fishingPrice.disable();
      // this.facilityFormGroup.controls.inputTv.reset();
    }
  }
  enableInputCarRental() {
    if (this.serviceFormGroup.controls.carRental.value === true) {
      this.serviceFormGroup.controls.carRentalPrice.enable();
    } else {
      this.serviceFormGroup.controls.carRentalPrice.disable();
      // this.facilityFormGroup.controls.inputTv.reset();
    }
  }
  enableInputCampFire() {
    if (this.serviceFormGroup.controls.campfire.value === true) {
      this.serviceFormGroup.controls.campfirePrice.enable();
    } else {
      this.serviceFormGroup.controls.campfirePrice.disable();
      // this.facilityFormGroup.controls.inputTv.reset();
    }
  }

  paymentFormGroup = this._formBuilder.group({});
  registerError: string = '';

  constructor(
    private _formBuilder: FormBuilder,
    private http: ServerHttpService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    public dialog: MatDialog
  ) {}
  ListSpecialDay: any[] = [];
  ngOnInit(): void {
    this.editor = new Editor();
    this.editor2 = new Editor();
    this.http.getSpecialDay().subscribe((data) => {
      for (let items of data) {
        this.ListSpecialDay.push({
          description: items.description,
          endDay: items.endDay,
          endMonth: items.endMonth,
          id: items.id,
          specialDayCode: items.specialDayCode,
          startDay: items.startDay,
          startMonth: items.startMonth,
          status: false,
          price: '',
        });
      }
      // this.ListSpecialDay = data
      console.log('this.ListSpecialDay ' , data);
    });
    this.facilityFormGroup.reset();
    this.facilityFormGroup.controls.inputTv.disable();
    this.facilityFormGroup.controls.inputBed.disable();
    this.facilityFormGroup.controls.inputSofa.disable();
    this.facilityFormGroup.controls.inputFan.disable();
    this.facilityFormGroup.controls.inputCookingStove.disable();
    this.facilityFormGroup.controls.inputShower.disable();
    this.facilityFormGroup.controls.inputToilet.disable();
    this.facilityFormGroup.controls.inputBathtub.disable();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
    this.editor2.destroy();
  }

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


  oDOM!: any;
  text!: any;
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
  facilityForm() {
    console.log(this.facilityFormGroup.value);
  }
  serviceForm() {
    console.log(this.serviceFormGroup.value);
  }
  paymentForm() {
    console.log(this.paymentFormGroup.value);
  }

  public register() {
    console.log('register');
    for (this.file of this.homestayImageFiles) {
      console.log('file homestayimage name:', this.file.name);
      const path = 'homestay/' + this.informationFormGroup.controls.homestayName.value +' ' + this.file.name ;
      const fileRef = this.storage.ref(path);
      this.storage.upload(path, this.file);

      this.homestayImages.push(this.file.name);
      console.log('path name', path);
    }

    // homestayLicenseFiles
    for (this.file of this.homestayLicenseFiles) {
      console.log('file homestay license name:', this.file.name);
      const path = 'license/' +  this.informationFormGroup.controls.homestayName.value +' ' +this.file.name ;
      const fileRef = this.storage.ref(path);
      this.storage.upload(path, this.file);

      this.homestayLicense = this.file.name;
      console.log('path name', path);
    }

    // lay value
    const formInformationFormGroupValue = this.informationFormGroup.controls;
    let homestayName = formInformationFormGroupValue.homestayName.value!;
    let priceNormalDay = formInformationFormGroupValue.priceNormalDay.value!;
    let priceWeekendDay = formInformationFormGroupValue.priceWeekendDay.value!;
    let address = formInformationFormGroupValue.address.value!;
    let city = formInformationFormGroupValue.city.value!;
    let checkInTime = formInformationFormGroupValue.checkInTime.value!;
    let checkOutTime = formInformationFormGroupValue.checkOutTime.value!;
    let numberOfRoom = formInformationFormGroupValue.number.value!;
    let description = this.text;

    // price special day
    type homestayPriceList = Array<{
      price: string;
      type: string;
      specialDayCode: any;
    }>;
    const myHomestayPriceList: homestayPriceList = [];

    myHomestayPriceList.push({
      price: priceNormalDay,
      type: 'normal',
      specialDayCode: undefined,
    });
    myHomestayPriceList.push({
      price: priceWeekendDay,
      type: 'weekend',
      specialDayCode: undefined,
    });
    for (let day of this.ListSpecialDay) {
      if (day.status) {
        myHomestayPriceList.push({
          price: day.price,
          type: 'special',
          specialDayCode: day.specialDayCode,
        });
      }
    }

    // facility
    const facilityFormGroupValue = this.facilityFormGroup.controls;
    type homestayCommonFacilities = Array<{ name: string; amount: string }>;
    const myhomestayCommonFacilities: homestayCommonFacilities = [];

    // Add new facility
    type homestayAdditionFacilities = Array<{ name: string; amount: string }>;
    const myhomestayAdditionFacilities: homestayAdditionFacilities = [];

    for (let value of this.newFacility) {
      if (value.status) {
        console.log('value facility true', value);
        myhomestayAdditionFacilities.push({
          name: value.name,
          amount: value.amount,
        });
        console.log(
          ' myHomestayAdditionFacility.push',
          myhomestayAdditionFacilities
        );
      }
    }

    if (facilityFormGroupValue.tv.value == true) {
      myhomestayCommonFacilities.push({
        name: 'TV',
        amount: facilityFormGroupValue.inputTv.value + '',
      });
    }

    if (facilityFormGroupValue.cookingStove.value == true) {
      myhomestayCommonFacilities.push({
        name: 'CookingStove',
        amount: facilityFormGroupValue.inputCookingStove.value + '',
      });
    }

    if (facilityFormGroupValue.bed.value == true) {
      myhomestayCommonFacilities.push({
        name: 'Bed',
        amount: facilityFormGroupValue.inputBed.value + '',
      });
    }

    if (facilityFormGroupValue.shower.value == true) {
      myhomestayCommonFacilities.push({
        name: 'Shower',
        amount: facilityFormGroupValue.inputShower.value + '',
      });
    }

    if (facilityFormGroupValue.sofa.value == true) {
      myhomestayCommonFacilities.push({
        name: 'Sofa',
        amount: facilityFormGroupValue.inputSofa.value + '',
      });
    }

    if (facilityFormGroupValue.toilet.value == true) {
      myhomestayCommonFacilities.push({
        name: 'Toilet',
        amount: facilityFormGroupValue.inputToilet.value + '',
      });
    }

    if (facilityFormGroupValue.fan.value == true) {
      myhomestayCommonFacilities.push({
        name: 'Fan',
        amount: facilityFormGroupValue.inputFan.value + '',
      });
    }

    if (facilityFormGroupValue.bathtub.value == true) {
      myhomestayCommonFacilities.push({
        name: 'Bathtub',
        amount: facilityFormGroupValue.inputBathtub.value + '',
      });
    }

    console.log(myhomestayCommonFacilities);

    const serviceFormGroupValue = this.serviceFormGroup.controls;
    type homestayServices = Array<{ name: string; price: string }>;
    const myHomestayServices: homestayServices = [];

    // Add new service
    for (let value of this.newServices) {
      if (value.status) {
        console.log('value service true', value);
        myHomestayServices.push({
          name: value.name,
          price: value.price,
        });
        console.log(' myHomestayServices.push', myHomestayServices);
      }
    }

    if (serviceFormGroupValue.wifi.value == true) {
      myHomestayServices.push({
        name: 'Wifi',
        price: serviceFormGroupValue.wifiPrice.value + '',
      });
    }

    if (serviceFormGroupValue.spa.value == true) {
      myHomestayServices.push({
        name: 'Spa',
        price: serviceFormGroupValue.spaPrice.value + '',
      });
    }

    if (serviceFormGroupValue.food.value == true) {
      myHomestayServices.push({
        name: 'Food',
        price: serviceFormGroupValue.foodPrice.value + '',
      });
    }

    if (serviceFormGroupValue.fishing.value == true) {
      myHomestayServices.push({
        name: 'Fishing',
        price: serviceFormGroupValue.fishingPrice.value + '',
      });
    }

    if (serviceFormGroupValue.bar.value == true) {
      myHomestayServices.push({
        name: 'Bar',
        price: serviceFormGroupValue.barPrice.value + '',
      });
    }

    if (serviceFormGroupValue.carRental.value == true) {
      myHomestayServices.push({
        name: 'CarRental',
        price: serviceFormGroupValue.carRentalPrice.value + '',
      });
    }

    if (serviceFormGroupValue.swimming.value == true) {
      myHomestayServices.push({
        name: 'Swimming',
        price: serviceFormGroupValue.swimmingPrice.value + '',
      });
    }

    if (serviceFormGroupValue.campfire.value == true) {
      myHomestayServices.push({
        name: 'Campfire',
        price: serviceFormGroupValue.campfirePrice.value + '',
      });
    }

    type homestayImages = Array<{ url: string }>;
    const myHomestayimages: homestayImages = [];
    for (let i of this.homestayImages) {
      myHomestayimages.push({ url: i.toString() });
      console.log('submit: ', i);
    }
    type homestayLicenses = { url: string };
    const myHomestayLicenses: homestayLicenses = { url: this.homestayLicense };
    console.log(this.homestayImages);
    console.log('check out', checkOutTime);

    console.log('price', myHomestayPriceList);
    // api
    this.http
      .registerLandlord(
        homestayName,
        description,
        address,
        city,
        numberOfRoom,
        checkInTime,
        checkOutTime,
        myHomestayLicenses,
        myHomestayimages,
        myHomestayServices,
        myhomestayCommonFacilities,
        myHomestayPriceList,
        myhomestayAdditionFacilities
      )
      .subscribe(
        (data) => {
          this.registerError = 'Register Success!!!';
          this.openDialogSuccess();
        },
        (error) => {
          if (error['status'] == 500) {
            this.registerError = 'please check your information again!';
            this.openDialog();
          } else {
            this.registerError = error;
            this.openDialog();
          }
        }
      );
  }
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
}

// dialog
// export interface DialogData {
//   message: string;
// }
