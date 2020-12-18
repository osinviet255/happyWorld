import { Entities } from './../../entities/Entities';
import { Controller } from './../../BSL/controller';
import { NavController } from '@ionic/angular';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-stock',
  templateUrl: './user-stock.page.html',
  styleUrls: ['./user-stock.page.scss'],
})
export class UserStockPage {

  userStock: [];

  constructor(private nav: NavController,
    private ctl: Controller,
    private glb: Entities) { }

  ionViewWillEnter(){
    this.ctl.searchListUserStock(this.glb.getUsername(), 10).then(() => {
      this.userStock = this.glb.getLstUserStock();
    });

  }

  goBack(){
    this.nav.pop();
  }

}
