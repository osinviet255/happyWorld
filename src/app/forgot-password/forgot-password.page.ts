import { Controller } from './../BSL/controller';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {

  constructor(public navCtrl: NavController, private ctl: Controller) { }

  goback() {
    this.navCtrl.pop();
  }

  handleForgotPass(){
    let username = (document.getElementById('sUsername') as HTMLTextAreaElement).value;
    let email = (document.getElementById('sEmail') as HTMLTextAreaElement).value;
    if(username === ''){
      this.ctl.displayAlert("Tên đăng nhập không được bỏ trống.");
    }
    else if(email === ''){
      this.ctl.displayAlert("Địa chỉ email không được bỏ trống");
    }
    else{
      let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!re.test(email)){
        this.ctl.displayAlert("Địa chỉ Email không đúng định dạng. Vui lòng kiểm tra lại.");
      }
      else{
        let password = this.ctl.randomString(10);
        this.ctl.ForgotPassword(username, email, password)
      }
    }
  }

}
