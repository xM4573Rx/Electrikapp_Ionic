import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

import * as firebase from 'firebase';

@Component({
  selector: 'app-groups-two',
  templateUrl: './groups-two.page.html',
  styleUrls: ['./groups-two.page.scss'],
})
export class GroupsTwoPage implements OnInit {

  users = 'StandBy/';
  users2 = 'Groups/';

  group: string;
  passed: any;
  email: any;
  name: any;

  refe = firebase.database().ref(this.users);
  refe2 = firebase.database().ref(this.users2);

  concat: any;

  constructor(
    private platform: Platform,
    private router: Router,
    private storage: Storage
  ) {
    this.platform.backButton.subscribe(async () => {
      if (this.router.isActive('/groups-two', true) && this.router.url === '/groups-two') {
        // tslint:disable-next-line: no-string-literal
        navigator['app'].exitApp();
      }
    });

    this.storage.get('Group').then((data) => {
      if (data != null) {
        this.group = data;
      }
    });
  }

  ngOnInit() { }

  openTabsPage() {
    // this.router.navigate(['/tabs']);
    this.router.navigate(['/home']);
  }
}
