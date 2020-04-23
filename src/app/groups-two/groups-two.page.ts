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

    this.storage.get('User').then((data) => {
      this.refe2.on('value', snap => {
        this.group = snap.child(data).child('Name').val();
      });
    });
  }

  ngOnInit() {
    this.refe.once('value', snap => {
      this.email = snap.child('Email').val();
      this.name = snap.child('Name').val();
      this.group = snap.child('Group').val();

      if ((this.email != null) && (this.name != null) && (this.group != null)) {
        this.storage.get('Email').then((data) => {
          if (data != null) {
            data = this.email;
            this.storage.set('Email', data);
          } else {
            let variable: any;
            variable = this.email;
            this.storage.set('Email', variable);
          }
        });

        this.storage.get('Name').then((data) => {
          if (data != null) {
            data = this.name;
            this.storage.set('Name', data);
          } else {
            let variable: any;
            variable = this.name;
            this.storage.set('Name', variable);
          }
        });

        this.storage.get('Group').then((data) => {
          if (data != null) {
            data = this.group;
            this.storage.set('Group', data);
          } else {
            let variable: any;
            variable = this.group;
            this.storage.set('Group', variable);
          }
        });

        this.refe.child('Name').remove();
        this.refe.child('Email').remove();
        this.refe.child('Group').remove();
      }
    });
  }

  openTabsPage() {
    this.router.navigate(['/tabs']);
  }
}
