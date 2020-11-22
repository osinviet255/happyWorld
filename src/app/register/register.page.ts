import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Controller } from '../BSL/controller';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  constructor(private modalController: ModalController, private ctl: Controller) { }

  dismissModal(){
    this.ctl.dismissModalRegister();
  }
}
