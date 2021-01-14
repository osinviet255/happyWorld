import { Controller } from 'src/app/BSL/controller';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Entities } from './../entities/Entities';
import { Component } from '@angular/core';

@Component({
  selector: 'app-persional',
  templateUrl: './persional.page.html',
  styleUrls: ['./persional.page.scss'],
})
export class PersionalPage {

  fullName: any;
  mobileNo: any;
  notifCount: any;
  constructor(private glb: Entities,
    private router: Router,
    private ctl: Controller) {
    this.fullName = this.glb.getFullName();
    this.mobileNo = this.glb.getMobileNo();
   }

   ionViewWillEnter(){
    this.countUnreadNotif();
   }

   gotoUserInfo(){
    this.router.navigateByUrl('user-info');
   }

   gotoEditUser(){
     this.router.navigateByUrl('user-edit');
   }
   gotoNotification(){
    this.router.navigateByUrl('notification');
    this.notifCount = this.countUnreadNotif();
  }

  goToListNews(id){
    this.router.navigate(['list-news', id]);
  }

  countUnreadNotif(){
    this.ctl.countUnreadNotif(0, 0, 0, 50).then(() => {
      this.notifCount = this.glb.getLstData().length;
      this.glb.setNotifCount(this.notifCount);
      this.notifCount = this.glb.getNotifCount();
    });
  }

   


}
