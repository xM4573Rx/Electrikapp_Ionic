import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { HTTP } from '@ionic-native/http/ngx';
import { LoadingController } from '@ionic/angular';

import * as firebase from 'firebase';

declare var WifiWizard2: any;

@Component({
  selector: 'app-name',
  templateUrl: './name.page.html',
  styleUrls: ['./name.page.scss'],
})
export class NamePage implements OnInit {

  path = 'Groups/';
  path2 = 'StandBy/';

  valorNet: string;
  valorPass: string;
  valorName: string;
  name: any;
  group: any;
  concat: any;
  device: any;
  data: any;

  i: any = 0;

  refe = firebase.database().ref(this.path);
  refe2 = firebase.database().ref(this.path2);

  constructor(
    private storage: Storage,
    private router: Router,
    private nativeHttp: HTTP,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.refe.once('value', snap => {
      this.concat = snap.child('Concat').val();

      if (this.concat != null) {
        this.storage.get('Concat').then((data) => {
          if (data != null) {
            data = this.concat;
            this.storage.set('Concat', data);
          } else {
            let variable: any;
            variable = this.concat;
            this.storage.set('Concat', variable);
          }
        });

        this.refe.child('Concat').remove();
      }
    });
  }

  async sendNodeData() {
    const url = 'http://192.168.4.1/data.json';

    this.data = {
      Red: this.valorNet,
      Contrasena: this.valorPass,
      Nombre: this.valorName,
    };

    console.log(this.data);

    const loading = await this.loadingCtrl.create();
    await loading.present();

    const nativeCall = this.nativeHttp.post(url, this.data, {
      'Content-Type': 'application/json'
    });

    from(nativeCall).pipe(
      finalize(() => loading.dismiss())
    )
    .subscribe(data => {
      console.log('native data: ', data);
      this.disconnectToNet();
    }, error => {
      console.log('JS call error: ', error);
    });
  }

  async disconnectToNet() {
    try {
      await WifiWizard2.remove('ElectrikAppPunto');
      await WifiWizard2.remove('ElectrikAppCentral');
    } catch (error) {
      console.log(error);
    }
  }

  openHomePage() {
    this.storage.get('User').then((data) => {
      this.refe2.child('Concat').set(data);
    });

    this.refe2.once('value', snap => {
      this.concat = snap.child('Concat').val();

      this.storage.get('Count').then((data) => {
        data = data + 1;
        this.device = 'Device' + data;

        this.refe.child(this.concat).child(this.device).child('name').set(this.valorName);

        this.storage.get('Count').then((val) => {
          if (val != null) {
            val = data;
            this.storage.set('Count', val);
          } else {
            let variable: any;
            variable = data;
            this.storage.set('Count', variable);
          }
        });
      });
      this.refe2.child('Concat').remove();
    });

    this.sendNodeData();
    this.router.navigate(['/tabs']);
  }
}
