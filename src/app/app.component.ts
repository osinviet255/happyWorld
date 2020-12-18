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
    apiKey: "AIzaSyBv7fi8RZi2nN0bKBsp-6P_p8jyfZux6N8",
    authDomain: "happyworld-98e22.firebaseapp.com",
    databaseURL: "https://happyworld-98e22-default-rtdb.firebaseio.com",
    projectId: "happyworld-98e22",
    storageBucket: "happyworld-98e22.appspot.com",
    messagingSenderId: "1055941850262",
    appId: "1:1055941850262:web:62a02105edae463425feb7",
    measurementId: "G-L2KF88VVNV"
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
      if (item === null) {
        localStorage.removeItem('account');
        this.router.navigate(['welcome-page']);
      }
      else {
        const expir = moment(item.expiry);
        console.log("Moment Now: " + momentNow + ", Expire: " + expir);
        if (momentNow > expir) {
          localStorage.removeItem('account');
          this.router.navigate(['welcome-page']);
        }
        else {
          this.glb.setJwtTokenKey(item.jwtToken);
          this.glb.setRefreshToken(item.refreshToken);
          this.glb.setUsername(item.acc);
          this.router.navigate(['tabs']);
        }
      }

      // this.router.navigate(['welcome-page']);
    });
  }
}
