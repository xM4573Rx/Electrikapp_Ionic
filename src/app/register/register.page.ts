import { Component, OnInit } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

import * as firebase from 'firebase';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  users = 'StandBy/';
  refe = firebase.database().ref(this.users);
  user: Observable<firebase.User>;
  datos: any = {};
  email: any;
  name: any;

  constructor(
    private afAuth: AngularFireAuth,
    private gplus: GooglePlus,
    private router: Router,
    private platform: Platform,
    private storage: Storage
  ) {
    this.user = this.afAuth.authState;

    this.platform.backButton.subscribe(async () => {
      if (this.router.isActive('/register', true) && this.router.url === '/register') {
        // tslint:disable-next-line: no-string-literal
        navigator['app'].exitApp();
      }
    });
  }

  ngOnInit() {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.storage.get('Group').then((data) => {
          if (data != null) {
            this.openHomePage();
          } else {
            this.openGroupsPage();
          }
        });
      } else {
        this.router.navigate(['/register']);
      }
    });
  }

  openGroupsPage() {
    this.router.navigate(['/groups']);
  }

  openHomePage() {
    // this.router.navigate(['/tabs/home']);
    this.router.navigate(['/home']);
  }

  googleLogin() {
    if (this.platform.is('cordova')) {
      this.nativeGoogleLogin();
    } else {
      this.webGoogleLogin();
    }
  }

  async nativeGoogleLogin() {
    try {
      const gplusUser = await this.gplus.login({
        webClientId: '793079450148-i6tskr537b3p3gdsjsbdk2tpr0rfjfpp.apps.googleusercontent.com',
        offline: true,
        scopes: 'profile email'
      });

      return await this.afAuth.auth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
      ).then(suc => {
        this.email = suc.user.email;
        this.name = suc.user.displayName;
        this.refe.child('Email').set(this.email);
        this.refe.child('Name').set(this.name.replace(/\s/g, '_'));
        this.storage.remove('Email');
        this.storage.remove('Name');
        this.storage.remove('Group');
        this.storage.remove('User');
      }).catch(ns => {
        alert('Error al iniciar sesión, verifique su conexión e inténtelo de nuevo. Error:' + ns);
      });
    } catch (err) {
      alert('Error al iniciar sesión, verifique su conexión e inténtelo de nuevo. Error:' + err);
    }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credentia = await this.afAuth.auth.signInWithPopup(provider)
      .then(suc => {
        this.email = suc.user.email;
        this.name = suc.user.displayName;
        this.refe.child('Email').set(this.email);
        this.refe.child('Name').set(this.name.replace(/\s/g, '_'));
        this.storage.remove('Email');
        this.storage.remove('Name');
        this.storage.remove('Group');
        this.storage.remove('User');
      }).catch(ns => {
        alert('Error al iniciar sesión, verifique su conexión e inténtelo de nuevo.');
      });
    } catch (err) {
      console.log(err);
    }
  }
}
