import { Entities } from './../entities/Entities';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage {

  dataObj: any;
  constructor(public navCtrl: NavController,
    private glb: Entities) { 
    this.dataObj = this.glb.getDataObject();
  }

  goback() {
    this.navCtrl.pop();
  }

}
