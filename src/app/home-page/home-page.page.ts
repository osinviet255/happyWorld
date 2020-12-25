import { Entities } from './../entities/Entities';
import { Controller } from './../BSL/controller';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage {

  lstUserStock: [];
  fullname: any;
  constructor(private router: Router, private ctl: Controller, private glb: Entities) {
    this.lstUserStock = this.glb.getLstData();
   }

  ionViewWillEnter(){
    this.lstUserStock = this.glb.getLstData();
    this.fullname = this.glb.getFullName();
    this.ctl.searchListUserStock(this.glb.getUsername(), 5).then(() => {
      this.lstUserStock = this.glb.getLstData();
    });    
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

}
