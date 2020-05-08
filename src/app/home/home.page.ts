import { Component, OnInit, NgZone } from '@angular/core';

import * as firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { HTTP } from '@ionic-native/http/ngx';
import { LoadingController } from '@ionic/angular';
import { from } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  // users = 'users/+573016683176/';
  users: any;
  path = 'Groups/';
  path3 = 'StandBy/';

  items: any;
  Aenergy = '';
  onDate: any = '';
  offDate: any = '';
  Apower = '';
  Denergy = '';
  Cenergy = 0.0;
  Cdevice = 0.0;
  Tcenergy = '';
  Tcdevice = '';
  progress = 0.0;
  inputText = '';
  state: boolean;

  names: Array<any> = [];

  refe = firebase.database().ref(this.path);
  refe2 = firebase.database().ref(this.users);
  refe3 = firebase.database().ref(this.path3);

  constructor(
    private storage: Storage,
    private zone: NgZone,
    private nativeHttp: HTTP,
    private loadingCtrl: LoadingController
  ) {
    this.storage.get('User').then((data) => {
      if (data != null) {
        this.users = data;
        console.log(this.users);
      }
    });

    // const query = this.refe.orderByKey();
    // query.once('value', snapshot => {
    //   snapshot.child(this.users).child('Devices').forEach(childSnapshot => {
    //     this.names.push(childSnapshot.val());
    //     console.log(this.names);
    //   });
    // });

    // const query = this.refe;
    // query.on('value', snap => {
    //   this.names.push(snap.child(this.users).child('Devices').val());
    //   console.log(this.names);
    // });

    // this.refe.child(this.users).child('All').child('Name').set(this.valorName);

    /*this.refe.orderByKey().on('child_changed', snap => {
      snap.forEach(snap2 => {
        if (snap2.val() !== undefined) {
          this.names.push(snap2.val());
          console.log(this.names);
        }
      });
    });

    this.refe2.on('value', snap => {
      this.Aenergy = snap.child('All').val().Energy + ' kWh';
      this.Apower = snap.child('All').val().Power + ' kWh';
      this.Denergy = snap.child('Device').val().Energy;
      this.Cenergy = (parseFloat(this.Aenergy) * 422.3);
      this.Cdevice = (parseFloat(this.Denergy) * 422.3);
      this.Tcenergy = this.Cenergy.toFixed(2).toString() + ' $';
      this.Tcdevice = this.Cdevice.toFixed(2).toString() + ' $ ' + '(' + this.Denergy + ' kWh)';
      this.state = snap.child('Device').val().State;
      this.offDate = snap.child('Device').val().Off;
      this.onDate = snap.child('Device').val().On;

      this.progress = (parseFloat(this.Denergy) / parseFloat(this.Aenergy));
    });*/
  }

  ngOnInit() {
    this.refe.on('value', snap => {
      // this.items = snap.child(this.users).child('All').val().Name;
      this.items = snap.child(this.users).child('All').val().Energy;
      console.log(this.items);
    });

    this.refe.orderByKey().on('value', snapshot => {
      this.names = [];
      snapshot.child(this.users).child('Devices').forEach(childSnapshot => {
        this.zone.run(() => {
          this.names.push(childSnapshot.val());
          console.log(this.names);
        });
      });
    });
  }
}
