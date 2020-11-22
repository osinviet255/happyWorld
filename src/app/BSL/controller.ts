import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
@Injectable()
export class Controller {
  crrModal: any = null;
  constructor(private modalController: ModalController) {

  }

  async showModalRegister() {
    // console.log("clicked")
    const modal = await this.modalController.create({
      component: RegisterPage,
      cssClass: 'cssModalRegister',
      backdropDismiss: true,
      showBackdrop: true,
      animated: true,
    });
    await modal.present();
    this.crrModal = modal;
    return this.crrModal;
  }
  dismissModalRegister() {
    if (this.crrModal) {
      this.crrModal.dismiss().then(() => { this.crrModal = null; });
    }
  }
}