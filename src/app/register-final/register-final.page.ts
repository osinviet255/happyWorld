import { LoadingController } from '@ionic/angular';
import { Controller } from './../BSL/controller';
import { Entities } from './../entities/Entities';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-final',
  templateUrl: './register-final.page.html',
  styleUrls: ['./register-final.page.scss'],
})
export class RegisterFinalPage {

  constructor(private glb: Entities,
    private ctl: Controller,
    private loadingNotif: LoadingController,
    private router: Router) { }

  mobileNo: any;
  ionViewWillEnter(){
   this.mobileNo = this.glb.getMobileRegister();
   this.mobileNo = "0" + this.mobileNo.substring(3);
   console.log("Mobile Register: " + this.mobileNo);
  
  }

  async Register(){
    let username = (document.getElementById('user_dn') as HTMLTextAreaElement).value;
    let password = (document.getElementById('pass_dn') as HTMLTextAreaElement).value;
    let fullName = (document.getElementById('fullname_dn') as HTMLTextAreaElement).value;
    let email = (document.getElementById('email_dn') as HTMLTextAreaElement).value;
    let mobileNo = this.mobileNo;
    const loading = await this.loadingNotif.create({
      message: 'Loading...',
      translucent: true
    });
    await loading.present();
    this.ctl.RegisterApi(username, password, fullName, email, mobileNo).then((res) => {
      loading.dismiss();
    });
  }
}
