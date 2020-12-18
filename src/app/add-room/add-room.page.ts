import { Controller } from './../BSL/controller';
import { Component } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.page.html',
  styleUrls: ['./add-room.page.scss'],
})
export class AddRoomPage {

  data = { roomname: '' };
  ref = firebase.database().ref('chatrooms/');
  constructor(public navCtrl: NavController, private load: LoadingController, private ctl: Controller) { }

  async addRoom() {
    const loading = await this.load.create({
      message: 'Loading...',
      translucent: true
    });
    await loading.present();
    if(this.data.roomname === ''){
      loading.dismiss();
      this.ctl.displayAlert("Tên nhóm không được bỏ trống. Quý khách vui lòng kiểm tra lại.");
    }
    else{
      let newData = this.ref.push();
      newData.set({
        roomname: this.data.roomname
      });
      loading.dismiss();
      this.navCtrl.pop();
    }
    
  }
}
