import { NavController } from '@ionic/angular';
import { Entities } from 'src/app/entities/Entities';
import { Controller } from 'src/app/BSL/controller';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.page.html',
  styleUrls: ['./notification-detail.page.scss'],
})
export class NotificationDetailPage {

  sub: any;
  notifId: any;
  notifData: any;
  notifCount: any;
  constructor(private route: ActivatedRoute,
    private ctl: Controller,
    private glb: Entities,
    private nav: NavController) { 

    this.sub = this.route.params.subscribe(param => {
      this.notifId = param['notifId'];
      console.log("NotificationId: " + this.notifId);      
    });
    this.notifCount = this.glb.getNotifCount();
  }

  ionViewDidEnter(){
    this.ctl.getNotifById(this.notifId).then(() => {
      this.notifData = this.glb.getDataObject();
      this.countUnreadNotif();
    });
  }

  goBack(){
    this.nav.pop();
  }

  countUnreadNotif(){
    this.ctl.countUnreadNotif(0, 0, 0, 50).then(() => {
      this.notifCount = this.glb.getLstData().length;
      this.glb.setNotifCount(this.notifCount);
      this.notifCount = this.glb.getNotifCount();
    });
  }

}
