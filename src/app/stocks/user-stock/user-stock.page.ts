import { Router } from '@angular/router';
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
  stockData: any;

  constructor(private nav: NavController,
    private ctl: Controller,
    private glb: Entities,
    private router: Router) { }

  ionViewWillEnter() {
    this.ctl.searchListUserStock(this.glb.getUsername(), 10).then(() => {
      this.userStock = this.glb.getLstData();
    });

  }

  goBack() {
    this.nav.pop();
  }

  gotoProjDetail(stockCode) {
    console.log("StockCode: " + stockCode);
    this.ctl.getStockByCode(stockCode).then(() => {
      this.stockData = this.glb.getDataObject();
      let idProj = this.stockData.idProject;
      console.log("ID Proj: " + idProj);
      this.ctl.getProjectById(idProj).then(() => {
        this.router.navigate(['project-detail']);
      });
    });
  }

}
