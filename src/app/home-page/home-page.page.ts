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
  constructor(private router: Router, private ctl: Controller, private glb: Entities) { }

  ionViewWillEnter(){
    this.ctl.searchListUserStock(this.glb.getUsername(), 5).then(() => {
      this.lstUserStock = this.glb.getLstUserStock();
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

}
