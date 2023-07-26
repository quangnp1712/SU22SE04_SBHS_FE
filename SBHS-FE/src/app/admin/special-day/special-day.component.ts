import { Component, OnInit } from '@angular/core';
import { ServerHttpService } from 'src/app/services/specialday.service';
import { MessageComponent } from '../../pop-up/message/message.component';
import { SuccessComponent } from '../../pop-up/success/success.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-special-day',
  templateUrl: './special-day.component.html',
  styleUrls: ['./special-day.component.scss'],
})
export class SpecialDayComponent implements OnInit {
  newSpecialDay: any[] = [];
  message!: string;
  Error: string = '';
  constructor(private http: ServerHttpService,public dialog: MatDialog) {}
  valueday30: Array<number> = [];
  valueday31: Array<number> = [];
  valueday28: Array<number> = [];
  valueMonth: Array<number> = [];

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
  startDay = '1';
  endDay = '1';
  startMonth = '1';
  endMonth = '1';
  description = '';
  flag = false;

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

  ngOnInit(): void {
    for (let index = 1; index < 31; index++) {
      this.valueday30.push(index);
    }
    for (let index = 1; index < 32; index++) {
      this.valueday31.push(index);
    }
    for (let index = 1; index < 29; index++) {
      this.valueday28.push(index);
    }
    for (let index = 1; index < 13; index++) {
      this.valueMonth.push(index);
    }
    this.newSpecialDay.push({
      starDay:this.startDay,
      startMonth:this.startMonth,
      endDay:this.endDay,
      endMonth:this.endMonth,
      description:this.description
    }
    );
  }
  addSpecialDay() {
    this.newSpecialDay.push({
      startDay: '1',
      endDay: '1',
      startMonth: '1',
      endMonth: '1',
      description: '',

    });
    console.log('values', this.newSpecialDay);
  }

  removeSpecialDay(i: any) {
    this.newSpecialDay.splice(i, 1);
    console.log('delete', this.newSpecialDay.length + i);
    console.log('values', this.newSpecialDay);
  }

  resetSpecial(): void {
    this.newSpecialDay = [];
    console.log(this.newSpecialDay);
  }

  public add() {
    console.log( '1 new specialday', this.newSpecialDay);

    console.log( '2 new specialday', this.newSpecialDay);

    this.http
      .addSpecialDay(
       this.newSpecialDay
      )
      .subscribe(
        (data) => {
          this.flag = true;
          console.log('data', data);
          this.message = 'Add Successfull';
            this.openDialogSuccess();
        },
        (error) => {
          if (error['status'] == 500) {
            // this.registerError = 'please check your information again!';
           this.message = 'please check your information again!';
            this.openDialog();
          } else {

            this.message = error;
            this.openDialog();
          }
        }
      );
  }
}
