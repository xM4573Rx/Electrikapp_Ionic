import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

import * as firebase from 'firebase';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements OnInit {

  users = 'StandBy/';
  user: any = {};
  email: any;
  name: any;
  flag: any;
  refe = firebase.database().ref(this.users);

  constructor(
    private platform: Platform,
    private router: Router,
    private storage: Storage
  ) {
    this.platform.backButton.subscribe(async () => {
      if (this.router.isActive('/groups', true) && this.router.url === '/groups') {
        // tslint:disable-next-line: no-string-literal
        navigator['app'].exitApp();
      }
    });
  }

  ngOnInit() {
    this.refe.once('value', snap => {
      this.email = snap.child('Email').val();
      this.name = snap.child('Name').val();

      if ((this.email != null) && (this.name != null)) {
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

        this.refe.child('Name').remove();
        this.refe.child('Email').remove();
      }
    });

    this.storage.get('Group').then((data) => {
      if (data != null) {
        this.router.navigate(['/groups-two']);
      }
    });
  }

  openNewPage() {
    this.storage.get('Email').then((data) => {
      this.refe.child('Email').set(data);
    });

    this.storage.get('Name').then((data) => {
      this.refe.child('Name').set(data);
    });

    this.router.navigate(['/new']);
  }
}
