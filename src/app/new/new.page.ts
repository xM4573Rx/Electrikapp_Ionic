import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

import * as firebase from 'firebase';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {

  path = 'StandBy/';
  path2 = 'Groups/';

  valor: string;
  user: any = {};
  email: any;
  name: any;
  group: any;
  concat: any;

  refe = firebase.database().ref(this.path);
  refe2 = firebase.database().ref(this.path2);

  constructor(
    private storage: Storage,
    private router: Router
  ) { }

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
  }

  openGroupsTwoPage() {
    this.storage.get('Email').then((data) => {
      this.refe.child('Email').set(data);
    });

    this.storage.get('Name').then((data) => {
      this.refe.child('Name').set(data);
    });

    this.storage.get('Group').then((data) => {
      if (data != null) {
        data = this.valor;
        this.storage.set('Group', data);
      } else {
        let variable: any;
        variable = this.valor;
        this.storage.set('Group', variable);
      }
    });

    this.refe.child('Group').set(this.valor);

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
            data = this.valor;
            this.storage.set('Group', data);
          } else {
            let variable: any;
            variable = this.valor;
            this.storage.set('Group', variable);
          }
        });

        this.concat = this.group + '_' + this.name;
        this.refe2.child(this.concat).child('Name').set(this.valor);

        this.storage.get('User').then((data) => {
          if (data != null) {
            data = this.concat;
            this.storage.set('User', data);
          } else {
            let variable: any;
            variable = this.concat;
            this.storage.set('User', variable);
          }
        });
      }
    });

    this.router.navigate(['/groups-two']);
  }
}
