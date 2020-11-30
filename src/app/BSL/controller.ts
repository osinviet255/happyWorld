import { Entities } from './../entities/Entities';
import { Injectable } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { HttpClient } from '@angular/common/http';
import { timeout } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as moment from 'moment';
@Injectable()
export class Controller {
  crrModal: any = null;
  apiUrl: string;
  output: any;
  constructor(private modalController: ModalController,
    private httpClient: HttpClient,
    private alertController: AlertController,
    private glb: Entities,
    private router: Router) {

  }

  async showModalRegister() {
    // console.log("clicked")
    const modal = await this.modalController.create({
      component: RegisterPage,
      cssClass: 'cssModalRegister',
      backdropDismiss: true,
      showBackdrop: true,
      animated: true,
    });
    await modal.present();
    this.crrModal = modal;
    return this.crrModal;
  }
  dismissModalRegister() {
    if (this.crrModal) {
      this.crrModal.dismiss().then(() => { this.crrModal = null; });
    }
  }

  async LoginApi(username, password) {
    const headers = { 'content-type': 'application/json' };
    let input = {
      username: username,
      password: password,
      rememberMe: true
    }
    let jsonInput = JSON.stringify(input);
    console.log("Login input: " + jsonInput);
    this.apiUrl = 'http://124.158.11.215:9901/happyworld/authenticate/login';
    this.output = this.httpClient.post(this.apiUrl, jsonInput, { headers: headers }).pipe(
      timeout(120000)
    );
    await this.output.toPromise()
      .then(res => {
        console.log("Login output: " + res);
        if (res.code !== "00") {
          this.displayAlert("Thông tin đăng nhập không hợp lệ. Quý khách vui lòng kiểm tra lại thông tin.")
        }
        else {
          if(res.data.status !== 1){
            this.displayAlert("Tài khoản chưa được kích hoạt. Quý khách vui lòng liên hệ với quản trị viên.")
          }
          else{
            this.glb.setJwtTokenKey(res.data.jwtToken);
            this.glb.setRefreshToken(res.data.refreshToken);
            const now = new Date()
            const item = {
              acc: username,
              jwtToken: res.data.jwtToken,
              refreshToken: res.data.refreshToken,
              expiry: moment(now).add(1, 'hour')
            }
            localStorage.setItem('account', JSON.stringify(item));
            this.router.navigateByUrl('tabs');
          }
          
        }
      })
      .catch(err => {
        console.log("LoginApi...failed. Error: " + err.message);
        this.displayAlert("Thông tin đăng nhập không hợp lệ. Quý khách vui lòng kiểm tra lại thông tin.")
      })
  }

  async displayAlert(value) {
    const alert = await this.alertController.create({
      header: 'Thông báo',
      message: value,
      buttons: ['OK']
    });
    await alert.present();
  }
}