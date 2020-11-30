import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Entities } from './entities/Entities';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private glb: Entities
  ) {
    this.initializeApp();
  }

  firebaseConfig = {
    apiKey: "AIzaSyACzJhTF1kKAu5u7SGOY3m6mC-Qy5dREks",
    authDomain: "happyworld-35dcc.firebaseapp.com",
    databaseURL: "https://happyworld-35dcc.firebaseio.com",
    projectId: "happyworld-35dcc",
    storageBucket: "happyworld-35dcc.appspot.com"
  };

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //Initial Firebase
      firebase.initializeApp(this.firebaseConfig);
      const sItem = localStorage.getItem('account');
      const item = JSON.parse(sItem);
      const now = new Date();
      const momentNow = moment(now);
      // if (item === null) {
      //   localStorage.removeItem('account');
      //   this.router.navigate(['welcome-page']);
      // }
      // else {
      //   const expir = moment(item.expiry);
      //   console.log("Moment Now: " + momentNow + ", Expire: " + expir);
      //   if (momentNow > expir) {
      //     localStorage.removeItem('account');
      //     this.router.navigate(['welcome-page']);
      //   }
      //   else {
      //     this.glb.setJwtTokenKey(item.jwtToken);
      //     this.glb.setRefreshToken(item.refreshToken);
      //     this.router.navigate(['tabs']);
      //   }
      // }

      this.router.navigate(['welcome-page']);
    });
  }
}
