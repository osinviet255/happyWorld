import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Controller } from '../BSL/controller';
import { RegisterPage } from '../register/register.page';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.page.html',
  styleUrls: ['./welcome-page.page.scss'],
})
export class WelcomePagePage {

  
  constructor(private router: Router, private ctl: Controller) { }

  handleLogin() {
    this.router.navigateByUrl('login');
  }

  async showModalRegister() {
    // console.log("clicked")
    this.ctl.showModalRegister();
  }
}