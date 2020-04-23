import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { interval } from 'rxjs';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { LoadingController } from '@ionic/angular';

declare var WifiWizard2: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  path = 'StandBy/';

  results = [];
  infoText = '';
  data = [];

  sub: any;
  concat: any;

  refe = firebase.database().ref(this.path);

  constructor(
    private storage: Storage,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {
    this.storage.get('User')
    .then(
      data => this.refe.child('Concat').set(data),
      error => console.error('Error getting item', error)
    );

    this.sub = interval(10000)
    .subscribe((val) => {
      console.log('called');
      this.getSSID();
    });
  }

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

  async getSSID() {
    this.infoText = 'Loading...';
    try {
      const results = await WifiWizard2.scan();
      this.results = results;
      this.infoText = '';
    } catch (error) {
      this.infoText = error;
    }

    for (const x of this.results) {
      this.data.push(x.SSID);
    }

    for (const i of this.data) {
      if (i === 'ElectrikAppPunto') {
        console.log('OK');
        this.connectToPointNet();
        this.sub.unsubscribe();
        this.openNamePage();
      }

      if (i === 'ElectrikAppCentral') {
        console.log('OK');
        this.connectToCentralNet();
        this.sub.unsubscribe();
        this.openNamePage();
      }
    }
  }

  async connectToPointNet() {
    try {
      const loading = await this.loadingCtrl.create();
      await loading.present();
      const state = await WifiWizard2.connect('ElectrikAppPunto', true, '12345678', 'WPA', false);
      console.log(state);
      loading.dismiss();
    } catch (error) {
      console.log(error);
    }
  }

  async connectToCentralNet() {
    try {
      const loading = await this.loadingCtrl.create();
      await loading.present();
      const state = await WifiWizard2.connect('ElectrikAppCentral', true, '12345678', 'WPA', false);
      console.log(state);
      loading.dismiss();
    } catch (error) {
      console.log(error);
    }
  }

  async disconnectToNet() {
    try {
      await WifiWizard2.remove('ElectrikAppPunto');
    } catch (error) {
      console.log(error);
    }
  }

  openNamePage() {
    this.storage.get('User').then((data) => {
      this.refe.child('Concat').set(data);
    });

    this.router.navigate(['/name']);
  }
}
