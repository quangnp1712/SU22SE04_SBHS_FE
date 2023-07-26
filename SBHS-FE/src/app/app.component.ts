import { Component } from '@angular/core';
import { FirebaseError, initializeApp } from 'firebase/app';
import { FirebaseApp } from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Project';
}
