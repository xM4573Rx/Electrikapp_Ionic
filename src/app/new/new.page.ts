import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

declare var WifiWizard2: any;

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {

  results = [];
  data = [];
  valorNet: string;
  sub: any;

  constructor(
    private router: Router,
    private storage: Storage,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.getNetName();

    this.sub = interval(10000)
    .subscribe((val) => {
      console.log('called');
      this.getSSID();
    });
  }

  async getSSID() {
    try {
      const results = await WifiWizard2.scan();
      this.results = results;
    } catch (error) {
      console.log(error);
    }

    for (const x of this.results) {
      this.data.push(x.SSID);
    }

    for (const i of this.data) {
      if (i === 'ElectrikAppPunto') {
        console.log('OK PUNTO');
        this.sub.unsubscribe();
        this.connectToNet('ElectrikAppPunto')
        .finally(() => {
          this.router.navigate(['/device']);
        });
      }

      if (i === 'ElectrikAppCentral') {
        console.log('OK CENTRAL');
        this.sub.unsubscribe();
        this.connectToNet('ElectrikAppCentral')
        .finally(() => {
          this.router.navigate(['/central']);
        });
      }
    }
  }

  async connectToNet(net: string) {
    try {
      const loading = await this.loadingCtrl.create();
      await loading.present();
      const state = await WifiWizard2.connect(net, true, '12345678', 'WPA', false);
      console.log(state);
      loading.dismiss();
    } catch (error) {
      console.log(error);
    }
  }

  async getNetName() {
    try {
      const state = await WifiWizard2.getConnectedSSID();
      this.valorNet = state;

      this.storage.get('Net').then((data) => {
        if (data != null) {
          data = this.valorNet;
          this.storage.set('Net', data);
        } else {
          let variable: any;
          variable = this.valorNet;
          this.storage.set('Net', variable);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}
