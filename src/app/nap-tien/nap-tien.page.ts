import { Entities } from './../entities/Entities';
import { Controller } from './../BSL/controller';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-nap-tien',
  templateUrl: './nap-tien.page.html',
  styleUrls: ['./nap-tien.page.scss'],
})
export class NapTienPage {

  constructor(public navCtrl: NavController, private ctl: Controller, private glb: Entities) { }

  moneyInput: any;
  goback(){
    this.navCtrl.pop();
  }

  naptien(money){
    this.ctl.createMoneyTrans(this.ctl.randomString(10), this.glb.getUsername(), 0, money, 0);
  }

}
