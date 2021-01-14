import { Entities } from 'src/app/entities/Entities';
import { Controller } from 'src/app/BSL/controller';
import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-add-conversation',
  templateUrl: './add-conversation.page.html',
  styleUrls: ['./add-conversation.page.scss'],
})
export class AddConversationPage {

  lstUser: [];
  loggedUser: any;
  data = { conversName: '', conversFrom: '', conversTo: '' };
  ref = firebase.database().ref('conversations/');
  constructor(private ctl: Controller,
    private glb: Entities,
    private load: LoadingController) { }

  ionViewWillEnter(){
    this.loggedUser = this.glb.getUsername();
   this.ctl.getListUserOther().then(() => {
     this.lstUser = this.glb.getLstData();
   });
  }


  dismisModal(){
    this.ctl.dismissModal();
  }

  async addConversations(username, fullname) {
    const loading = await this.load.create({
      message: 'Loading...',
      translucent: true
    });
    await loading.present();
    let newData = this.ref.push();
      newData.set({
        conversName: fullname,
        conversFrom: this.glb.getUsername(),
        conversTo: username
      });
      loading.dismiss();
      this.ctl.dismissModal();
    
  }
}
