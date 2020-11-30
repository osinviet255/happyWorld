import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';

@Component({
  selector: 'app-register-phone',
  templateUrl: './register-phone.page.html',
  styleUrls: ['./register-phone.page.scss'],
})
export class RegisterPhonePage {

  phoneNumber: any = '';
  verificationId: any;
  code = '';
  constructor(private firebaseX: FirebaseX) {
    const tell = '+84965449882';
    this.firebaseX.verifyPhoneNumber(tell, 120000).then((success: any) => {
      debugger
      this.verificationId = success.verificationId;
      console.log(this.verificationId);
    });  
   }

  signIn(phoneNumber: number) { //Step 2 - Pass the mobile number for verification
    debugger
    let number = this.phoneNumber;
    (<any>window).FirebasePlugin.verifyPhoneNumber(number, 60, (credential) => {
      console.log(credential);
      
      var verificationId = credential.verificationId;
      alert("successful");
    }, (error) => {
      //this.eer = error;
      console.error(error);
      alert("OTP Failed.")
    });
  }

}
