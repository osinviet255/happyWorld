import { Entities } from './../entities/Entities';
import { Controller } from './../BSL/controller';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonContent } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.page.html',
  styleUrls: ['./chat-detail.page.scss'],
})
export class ChatDetailPage {

  @ViewChild(IonContent) content: IonContent;
  data = { type: '', nickname: '', message: '' };
  chats = [];
  roomkey: any;
  nickname: any;
  roomName: any;
  dienthoai: any;
  offStatus: boolean = false;
  sub: any;
  constructor(private route: ActivatedRoute, private alertController: AlertController,
    private ctl: Controller, private glb: Entities, private router: Router) {
    this.sub = this.route.params.subscribe(param => {
      this.roomkey = param['roomKey'];
      this.nickname = param['nickname'];
    });
    this.roomName = this.glb.getRoomName();
  }

  ionViewDidEnter() {
    this.roomName = this.glb.getRoomName();
    this.data.type = 'message';
    this.data.nickname = this.glb.getUsername();

    const joinData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
    joinData.set({
      type: 'join',
      user: this.data.nickname,
      message: this.data.nickname + ' đã tham gia nhóm.',
      sendDate: Date()
    });
    this.data.message = '';

    firebase.database().ref('chatrooms/' + this.roomkey + '/chats').on('value', resp => {
      this.chats = [];
      this.chats = snapshotToArray(resp);
      setTimeout(() => {
        if (this.offStatus === false) {
          this.content.scrollToBottom(0);
        }
      }, 0);
    });
  }

  sendMessage() {
    let newData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
    newData.set({
      type: this.data.type,
      user: this.data.nickname,
      message: this.data.message,
      username: this.glb.getUsername(),
      sendDate: Date()
    });
    this.ctl.CreateChatHistory(this.glb.getUsername(), this.roomName, this.data.message);
    this.data.message = '';
    this.content.scrollToBottom(0);
  }

  exitChat() {
    let exitData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
    exitData.set({
      type: 'exit',
      user: this.data.nickname,
      message: this.data.nickname + ' đã thoát khỏi nhóm.',
      sendDate: Date()
    });

    this.offStatus = true;

    this.router.navigate(['/tabs/group-chat']);
  }

  goBack() {
    this.router.navigate(['/tabs/group-chat']);
  }
}
export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    if (item.type === "message") {
      returnArr.push(item);
    }
  });

  return returnArr;
};