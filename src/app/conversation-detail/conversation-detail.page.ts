import { Controller } from 'src/app/BSL/controller';
import { Entities } from 'src/app/entities/Entities';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { IonContent, NavController } from '@ionic/angular';

@Component({
  selector: 'app-conversation-detail',
  templateUrl: './conversation-detail.page.html',
  styleUrls: ['./conversation-detail.page.scss'],
})
export class ConversationDetailPage {

  @ViewChild(IonContent) content: IonContent;
  chats: any[];
  data = { type: '', nickname: '', message: '' };
  sub: any;
  converKey: any;
  nickname: any;
  converName: any;
  offStatus: boolean = false;
  constructor(private route: ActivatedRoute,
    private glb: Entities,
    private nav: NavController,
    private ctl: Controller) {

    this.sub = this.route.params.subscribe(param => {
      this.converKey = param['converKey'];
      this.nickname = param['nickname'];
    });
    this.converName = this.glb.getconversationName();
   }

   ionViewDidEnter(){
    this.converName = this.glb.getconversationName();
    this.data.type = 'message';
    this.data.nickname = this.glb.getUsername();

    const joinData = firebase.database().ref('conversations/' + this.converKey + '/chats').push();
    joinData.set({
      type: 'join',
      user: this.data.nickname,
      message: this.data.nickname + ' đã tham gia nhóm.',
      sendDate: Date()
    });
    this.data.message = '';

    firebase.database().ref('conversations/' + this.converKey + '/chats').on('value', resp => {
      this.chats = [];
      this.chats = snapshotToArray(resp);
      setTimeout(() => {
        if (this.offStatus === false) {
          this.content.scrollToBottom(0);
        }
      }, 0);
    });
   }

   goBack(){
     this.nav.pop();
   }

   sendMessage() {
    let newData = firebase.database().ref('conversations/' + this.converKey + '/chats').push();
    newData.set({
      type: this.data.type,
      user: this.data.nickname,
      message: this.data.message,
      username: this.glb.getUsername(),
      sendDate: Date()
    });
    this.ctl.CreateChatHistory(this.glb.getUsername(), this.converName, this.data.message);
    this.data.message = '';
    this.content.scrollToBottom(0);
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