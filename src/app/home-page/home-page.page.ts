import { Entities } from './../entities/Entities';
import { Controller } from './../BSL/controller';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FcmService } from './../services/fcm.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage {

  lstUserStock: [];
  fullname: any;
  notifCount: any;
  constructor(private router: Router, private ctl: Controller, private glb: Entities, private fcmService: FcmService) {
    this.lstUserStock = this.glb.getLstData();
   }

  ionViewWillEnter(){
    this.fcmService.initPush();
    this.lstUserStock = this.glb.getLstData();
    this.fullname = this.glb.getFullName();
    this.ctl.searchListUserStock(null, this.glb.getUsername(), 5).then(() => {
      this.lstUserStock = this.glb.getLstData();
    });    
    this.countUnreadNotif();
  }

  gotoDetail(){
    this.router.navigateByUrl('news');
  }

  gioithieu(){
    this.router.navigateByUrl('tabs/gioithieu');
  }

  gotoNewsCategory(){
    this.router.navigateByUrl('news-category');
  }

  goToUserStock(){
    this.router.navigateByUrl('user-stock');
  }

  goToListProjByType(typeId){
    console.log(typeId);
    this.router.navigate(['list-project', typeId]);
  }

  imageFilePath_change(event){
    debugger
    this.ctl.TestUploadFile(event.target.files);
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
