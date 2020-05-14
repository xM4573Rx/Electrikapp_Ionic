import { Component, OnInit, NgZone } from '@angular/core';

import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-control',
  templateUrl: './control.page.html',
  styleUrls: ['./control.page.scss'],
})
export class ControlPage implements OnInit {

  path = 'Groups/';
  path2 = 'StandBy/';
  path3 = 'users/+573016683176/';

  users: any;
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
    private storage: Storage,
    private zone: NgZone
  ) {
    this.storage.get('User').then((data) => {
      if (data != null) {
        this.users = data;
        console.log(this.users);
      }
    });

    /*this.refe.child('Casa_jorge_lopez').orderByKey().on('child_added', snap => {
      snap.forEach(snap2 => {
        if (snap2.val() !== undefined) {
          this.names.push(snap2.val().Name);
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
    });*/
  }

  ngOnInit() {
    this.refe.orderByKey().on('value', snapshot => {
      this.names = [];
      snapshot.child(this.users).child('Devices').forEach(childSnapshot => {
        this.zone.run(() => {
          if (childSnapshot.val() !== undefined) {
            this.names.push(childSnapshot.val());
          }
        });
      });
    });
  }

  openTimerPage() {
    this.router.navigate(['/timer']);
  }

  openNewPage() {
    this.router.navigate(['/new']);
  }

  change() {
    this.refe3.child('Device').child('State').set(this.state);
  }
}
