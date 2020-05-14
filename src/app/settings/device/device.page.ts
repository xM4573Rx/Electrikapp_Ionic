import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { from } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

import * as firebase from 'firebase';

declare var WifiWizard2: any;

@Component({
  selector: 'app-device',
  templateUrl: './device.page.html',
  styleUrls: ['./device.page.scss'],
})
export class DevicePage implements OnInit {

  path = 'Groups/';

  valorNet: string;
  valorName: string;
  valorPass: string;
  users: any;
  data: any;
  counter = 0;
  device: any;

  refe = firebase.database().ref(this.path);

  constructor(
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private nativeHttp: HTTP,
    private router: Router
  ) {
    this.storage.get('User').then((data) => {
      if (data != null) {
        this.users = data;
      }
    });

    this.storage.get('Net').then((data) => {
      if (data != null) {
        this.valorNet = data;
      }
    });

    this.storage.get('Counter').then((data) => {
      if (data != null) {
        this.counter = data;
      }
    });
  }

  ngOnInit() {
  }

  async sendNodeData() {
    const url = 'http://192.168.4.1/data.json';

    this.data = {
      Red: this.valorNet,
      Contrasena: this.valorPass,
      Grupo: this.users
    };

    console.log(this.data);

    const loading = await this.loadingCtrl.create();
    await loading.present();

    const nativeCall = this.nativeHttp.post(url, this.data, {
      'Content-Type': 'application/json; charset=utf-8'
    });

    from(nativeCall).pipe(
      finalize(() => loading.dismiss())
    )
    .subscribe(data => {
      console.log('native data: ', data.data);
      if (data.status === 200) {
        this.disconnectToNet();
      }
    }, error => {
      console.log('JS call error: ', error);
    });
  }

  async disconnectToNet() {
    try {
      // const state = await WifiWizard2.remove('ElectrikAppCentral');
      const state = await WifiWizard2.disconnect('ElectrikAppPunto');
      // const state = await WifiWizard2.disconnect();
      console.log(state);
    } catch (error) {
      console.log(error);
    }
  }

  openHomePage() {
    this.sendNodeData()
    .finally(() => {
      this.counter += 1;
      this.device = 'Device_' + this.counter;
      this.refe.child(this.users).child('Devices').child(this.device).child('Name').set(this.valorName);
      this.refe.child(this.users).child('Devices').child(this.device).child('Energy').set(0);
      this.refe.child(this.users).child('Devices').child(this.device).child('On').set(0);
      this.refe.child(this.users).child('Devices').child(this.device).child('Off').set(0);

      this.storage.get('Counter').then((data) => {
        if (data != null) {
          data = this.counter;
          this.storage.set('Counter', data);
        } else {
          let variable: any;
          variable = this.counter;
          this.storage.set('Counter', variable);
        }
      });

      this.router.navigate(['/tabs/home']);
    });
  }
}
