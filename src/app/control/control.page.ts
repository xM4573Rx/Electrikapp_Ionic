import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

import * as firebase from 'firebase';

@Component({
  selector: 'app-control',
  templateUrl: './control.page.html',
  styleUrls: ['./control.page.scss'],
})
export class ControlPage implements OnInit {

  path = 'Groups';
  path2 = 'StandBy/';
  path3 = 'users/+573016683176/';

  onDate: any = '';
  offDate: any = '';
  TimeOnOff: any = '';
  TTimeOnOff = '';
  state: boolean;
  concat: any;
  names: Array<any> = [];

  refe = firebase.database().ref(this.path);
  refe3 = firebase.database().ref(this.path3);
  refe2 = firebase.database().ref(this.path2);

  constructor(
    private router: Router,
    private storage: Storage
  ) {
    this.refe.orderByKey().on('child_added', snap => {
      snap.forEach(snap2 => {
        if (snap2.val() !== undefined) {
          this.names.push(snap2.val());
          console.log(this.names);
        }
      });
    });

    this.refe3.on('value', snap => {
      this.state = snap.child('Device').val().State;
      this.offDate = snap.child('Device').val().Off;
      this.onDate = snap.child('Device').val().On;

      if (this.state === true) {
        this.TimeOnOff = this.offDate;
        this.TTimeOnOff = 'Off';
      } else {
        this.TimeOnOff = this.onDate;
        this.TTimeOnOff = 'On';
      }
    });
  }

  ngOnInit() {
  }

  openTimerPage() {
    this.router.navigate(['/timer']);
  }

  openListPage() {
    this.storage.get('User').then((data) => {
      this.refe2.child('Concat').set(data);
    });

    this.router.navigate(['/list']);
  }

  change() {
    this.refe3.child('Device').child('State').set(this.state);
  }
}
