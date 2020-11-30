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
    if (user === '') {
      this.ctl.displayAlert("Tài khoản không được bỏ trống. Quý khách vui lòng kiểm tra lại.")
    }
    else if (pass === '') {
      this.ctl.displayAlert("Mật khẩu không được bỏ trống. Quý khách vui lòng kiểm tra lại.")
    }
    else {
      if (Number(user)) {
        if (!user.startsWith("0") || user.length != 10) {
          this.ctl.displayAlert("Số điện thoại không hợp lệ. Quý khách vui lòng kiểm tra lại.")
        }
        else {
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
      else {
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
  }

  forgotPass(){
    this.router.navigateByUrl('forgot-password');
  }
}
