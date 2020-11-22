import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-nap-tien',
  templateUrl: './nap-tien.page.html',
  styleUrls: ['./nap-tien.page.scss'],
})
export class NapTienPage {

  constructor(public navCtrl: NavController) { }

  goback(){
    this.navCtrl.pop();
  }

}
