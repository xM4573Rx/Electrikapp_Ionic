import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth';

import { timer } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  showSplash = true;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private afAuth: AngularFireAuth,
    private storage: Storage,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

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

      timer(1000).subscribe(() => this.showSplash = false);
    });
  }

  openGroupsPage() {
    this.router.navigate(['/groups']);
  }

  openHomePage() {
    this.router.navigate(['/tabs/home']);
    // this.router.navigate(['/home']);
  }
}
