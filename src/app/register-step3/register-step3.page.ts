import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Controller } from '../BSL/controller';
import { Entities } from '../entities/Entities';

@Component({
  selector: 'app-register-step3',
  templateUrl: './register-step3.page.html',
  styleUrls: ['./register-step3.page.scss'],
})
export class RegisterStep3Page {

  constructor(public navCtrl: NavController,
    public glb: Entities,
    public ctl: Controller,
    public router: Router,
    private loadingNotif: LoadingController) { }

  async VerifyOtp(){
    let otpCode = (document.getElementById('sCode') as HTMLTextAreaElement).value;
    let confirmationResult = this.glb.getconfirmationResult();
    const loading = await this.loadingNotif.create({
      message: 'Loading...',
      translucent: true
    });
    await loading.present();
    confirmationResult.confirm(otpCode)
    .then((result) => {
      console.log("VerifyOtp result: " + result);
      loading.dismiss();
      this.router.navigateByUrl('register-final'); 
    })
    .catch((error) => {
      loading.dismiss();
      this.ctl.displayAlert("Mã xác thực không chính xác, vui lòng thử lại.");
      console.log("VerifyOtp...failed. Error: " + error);
    })
  }
}
