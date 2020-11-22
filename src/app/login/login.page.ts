import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(public navCtrl: NavController, private router: Router) { }

  goback(){
    this.navCtrl.pop();
  }

  handelLogin(){
    this.router.navigateByUrl('tabs');
  }

}
