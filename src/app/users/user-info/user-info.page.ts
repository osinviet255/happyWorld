import { Entities } from 'src/app/entities/Entities';
import { Controller } from 'src/app/BSL/controller';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage {

  lstData: [];
  constructor(private nav: NavController,
    private router: Router,
    private alertController: AlertController,
    private ctl: Controller,
    private glb: Entities) { }

    ionViewWillEnter(){
     this.ctl.GetUserByUsername(this.glb.getUsername()).then(() => {
       this.lstData = this.glb.getLstData();
     });
    }

  goBack() {
    this.nav.pop();
  }

  async logout() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Logout',
      message: 'Bạn có muốn thoát khỏi hệ thống?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'OK',
          handler: () => {
            localStorage.removeItem('account');
            this.router.navigateByUrl('welcome-page');
          }
        }
      ]
    });

    await alert.present();

  }

  gotoEdit(){
    this.router.navigateByUrl('user-edit');
  }
}
