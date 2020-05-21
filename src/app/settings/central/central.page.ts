import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { from } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

import * as firebase from 'firebase';
import { Router } from '@angular/router';

declare var WifiWizard2: any;

@Component({
  selector: 'app-central',
  templateUrl: './central.page.html',
  styleUrls: ['./central.page.scss'],
})
export class CentralPage implements OnInit {

  path = 'Groups/';

  valorNet: string;
  valorPass: string;
  valorName: string;
  name: string;
  concat: any;
  data: any;

  refe = firebase.database().ref(this.path);

  constructor(
    private loadingCtrl: LoadingController,
    private nativeHttp: HTTP,
    private storage: Storage,
    private router: Router
  ) {
    this.storage.get('Name').then((data) => {
      if (data != null) {
        this.name = data;
      }
    });

    this.storage.get('Net').then((data) => {
      if (data != null) {
        this.valorNet = data;
      }
    });
  }

  ngOnInit() { }

  async sendNodeData() {
    const url = 'http://192.168.4.1/data.json';

    this.data = {
      Red: this.valorNet,
      Contrasena: this.valorPass,
      Grupo: this.concat
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
      const state = await WifiWizard2.disconnect('ElectrikAppCentral');
      // const state = await WifiWizard2.disconnect();
      console.log(state);
    } catch (error) {
      console.log(error);
    }
  }

  openGroupsTwoPage() {
    this.concat = this.valorName + '_' + this.name;

    this.storage.get('Group').then((data) => {
      if (data != null) {
        data = this.valorName;
        this.storage.set('Group', data);
      } else {
        let variable: any;
        variable = this.valorName;
        this.storage.set('Group', variable);
      }
    });

    this.storage.get('User').then((data) => {
      if (data != null) {
        data = this.concat;
        console.log(data);
        this.storage.set('User', data);
      } else {
        let variable: any;
        variable = this.concat;
        console.log(variable);
        this.storage.set('User', variable);
      }
    });

    this.sendNodeData()
    .finally(() => {
      // this.refe.child(this.concat).child('All').child('Name').set(this.valorName);
      // this.refe.child(this.concat).child('All').child('Energy').set(0);
      // this.refe.child(this.concat).child('All').child('Power').set(0);
      this.refe.child(this.concat).child('All').set({
        Name: this.valorName,
        Energy: 0,
        Power: 0
      });
      this.refe.child(this.concat).child('Settings').set({
        Date: 0,
        Cost: 0,
        Projection: 0
      });
      this.router.navigate(['/groups-two']);
    });
  }
}
