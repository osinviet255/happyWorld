import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage {

  constructor(public navCtrl: NavController) { }

  goback() {
    this.navCtrl.pop();
  }

}
