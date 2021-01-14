import { Router } from '@angular/router';
import { Entities } from 'src/app/entities/Entities';
import { Controller } from 'src/app/BSL/controller';
import { NavController, LoadingController } from '@ionic/angular';
import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage {

  lstNotification: [];
  notifCount: any;
  constructor(private nav: NavController,
    private ctl: Controller,
    private glb: Entities,
    private router: Router,
    private loadingNotif: LoadingController) { }

  async ionViewWillEnter(){
    const loading = await this.loadingNotif.create({
      message: 'Loading...',
      translucent: true
    });
    await loading.present();
   this.ctl.searchNotification(0, 0, 50).then(() => {
     this.lstNotification = this.glb.getLstData();
     this.countUnreadNotif();
     loading.dismiss();
   });
   
  }

  goBack(){
    this.nav.pop();
  }

  countUnreadNotif(){
    this.ctl.countUnreadNotif(0, 0, 0, 50).then(() => {
      this.notifCount = this.glb.getLstData().length;
      this.glb.setNotifCount(this.notifCount);
    });
  }

  gotoDetail(id){
    //Update Notification status
    this.ctl.changeNotifStatus(id);
    this.countUnreadNotif();
    this.notifCount = this.glb.getNotifCount();
    this.router.navigate(['notification-detail', id]);
  }

  getNotifAll(){
    document.getElementById("tabAll").className = "tabtb3 active";
    document.getElementById("tabApp").className = "tabtb2";
    document.getElementById("tabAdmin").className = "tabtb1";
    this.loadNotifList(0);
  }

  getNotifApp(){
    document.getElementById("tabAll").className = "tabtb3";
    document.getElementById("tabApp").className = "tabtb2 active";
    document.getElementById("tabAdmin").className = "tabtb1";
    this.loadNotifList(2);
  }

  getNotifAdmin(){
    document.getElementById("tabAll").className = "tabtb3";
    document.getElementById("tabApp").className = "tabtb2";
    document.getElementById("tabAdmin").className = "tabtb1 active";
    this.loadNotifList(1);
  }

  async loadNotifList(type){
    const loading = await this.loadingNotif.create({
      message: 'Loading...',
      translucent: true
    });
    await loading.present();
    this.ctl.searchNotification(type, 0, 50).then(() => {
      this.lstNotification = this.glb.getLstData();
      loading.dismiss();
    });
  }



}
