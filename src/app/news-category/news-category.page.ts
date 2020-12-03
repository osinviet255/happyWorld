import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-news-category',
  templateUrl: './news-category.page.html',
  styleUrls: ['./news-category.page.scss'],
})
export class NewsCategoryPage {

  constructor(private navCtrl: NavController) { }

  goback() {
    this.navCtrl.pop();
  }
}
