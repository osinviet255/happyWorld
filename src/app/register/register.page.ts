import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Controller } from '../BSL/controller';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  constructor(private modalController: ModalController, private ctl: Controller, private router: Router) { }

  dismissModal(){
    this.ctl.dismissModalRegister();
  }

  HandleRegister(){
    this.router.navigateByUrl('register-phone');
  }
}
