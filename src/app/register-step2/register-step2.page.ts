import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { NavController } from '@ionic/angular';
import { Controller } from '../BSL/controller';
import { Entities } from '../entities/Entities';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-step2',
  templateUrl: './register-step2.page.html',
  styleUrls: ['./register-step2.page.scss'],
})
export class RegisterStep2Page {

  mobileNo: string = '';
  verificationID: any = '';
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  constructor(private firebaseAuthentication: FirebaseAuthentication,
    public navCtrl: NavController,
    private ctl: Controller,
    private glb: Entities,
    private router: Router) { }

  ionViewWillEnter() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    this.ctl.dismissModalRegister();
  }
  sendOTP() {
    const appVerifier = this.recaptchaVerifier;
    let mobileNo = (document.getElementById('sMobileNo') as HTMLTextAreaElement).value;
    this.mobileNo = mobileNo;
    let ref = { mobileNumber: "" };
    if (this.ctl.VerifyMobileNumber84(mobileNo, ref)) {
      firebase.auth().signInWithPhoneNumber(ref.mobileNumber, appVerifier)
        .then(confirmationResult => {
          console.log(confirmationResult);
          this.glb.setverificationId = confirmationResult.verificationId;
          this.glb.setconfirmationResult(confirmationResult);
          this.glb.setMobileRegister(ref.mobileNumber);
          this.router.navigateByUrl('register-step3');          
        })
        .catch((error) => {
          console.error("SMS not sent", error);
          this.ctl.displayAlert("Số điện thoại đã gửi xác nhận quá nhiều lần. Vui lòng thử lại sau 1 giờ nữa.")
        });
    }
  }

  goback() {
    this.navCtrl.pop();
  }

}
