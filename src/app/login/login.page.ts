import { Component } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Controller } from '../BSL/controller';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(public navCtrl: NavController, private router: Router, private loadingNotif: LoadingController, private ctl: Controller) { }

  goback() {
    this.navCtrl.pop();
  }

  async handelLogin() {
    let user = (document.getElementById('sUser') as HTMLTextAreaElement).value;
    let pass = (document.getElementById('sPass') as HTMLTextAreaElement).value;
    const loading = await this.loadingNotif.create({
      message: 'Loading...',
      translucent: true
    });
    await loading.present();
    this.ctl.LoginApi(user, pass).then(res => {
      loading.dismiss();
    })
  }

}
