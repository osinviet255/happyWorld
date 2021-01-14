import { Controller } from 'src/app/BSL/controller';
import { Entities } from './../entities/Entities';
import { Component } from '@angular/core';
import * as firebase from 'firebase';
import * as moment from 'moment';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.page.html',
  styleUrls: ['./group-chat.page.scss'],
})
export class GroupChatPage {

  ref = firebase.database().ref('chatrooms/');
  refConver = firebase.database().ref('conversations/')
  rooms = [];
  conversations = [];
  crrRoom: any;
  crrConver: any;
  chats = [];
  temp = [];
  nickname: string;
  constructor(private glb: Entities,
    private load: LoadingController,
    private router: Router,
    private ctl: Controller) { 
      
    }

  ionViewWillEnter(){
    this.LoadGroup();
  }

  async LoadGroup() {
    const loading = await this.load.create({
      message: 'Loading...',
      translucent: true
    });
    await loading.present();
    this.ref.on('value', resp => {
      this.rooms = [];
      this.rooms = snapshotToArray(resp);
      for (let i = 0; i < this.rooms.length; i++) {
        firebase.database().ref('chatrooms/' + this.rooms[i].key + '/chats').on('value', resp => {
          this.chats = [];
          this.chats = snapshotToArray(resp);
          for (let j = this.chats.length - 1; j > 0; j--) {
            let type = this.chats[j].type;
            if (type === "message") {
              let msg = this.chats[j].message;
              let time = this.chats[j].sendDate;
              this.crrRoom = this.rooms[i];
              this.crrRoom.lastMsg = msg;
              const now = new Date();
              const momentNow = moment(now).format("YYYYMMDD");
              if (moment(time).format("YYYYMMDD") !== momentNow) {
                this.crrRoom.lastTime = moment(time).format("DD/MM/YYYY");
              }
              else {
                let date1 = new Date(time).getMinutes();
                let date2 = new Date(now).getMinutes();
                let mins = Number(date2) - Number(date1);
                if (mins <= 1) {
                  this.crrRoom.lastTime = "Vừa xong";
                }
                else if (mins < 60) {
                  this.crrRoom.lastTime = mins + " phút trước";
                }
                else {
                  date1 = new Date(time).getHours();
                  date2 = new Date(now).getHours();
                  let hours = Number(date2) - Number(date1);
                  this.crrRoom.lastTime = hours + "h trước";
                }
              }
              if (this.glb.getUsername() === this.chats[j].user) {
                this.rooms[i].user = "Tôi: ";
              }
              else {
                this.rooms[i].user = this.chats[j].username + ": ";
              }
              this.rooms[i] = this.crrRoom;
              console.log(this.rooms[i]);
              break;
            }
          }
        });
      }
      this.temp = this.rooms;

    });

//Ref conversations
this.refConver.on('value', resp => {
  this.conversations = [];
  let conversTmp = [];
  conversTmp = snapshotToArrayConvers(resp);
  for(let i = 0; i < conversTmp.length; i++){
    if(conversTmp[i].conversFrom === this.glb.getUsername() || conversTmp[i].conversTo === this.glb.getUsername()){
      this.conversations.push(conversTmp[i]);
    }
  }
  for (let i = 0; i < this.conversations.length; i++) {
    if(this.conversations[i].conversFrom === this.glb.getUsername() || this.conversations[i].conversTo === this.glb.getUsername()){
      firebase.database().ref('conversations/' + this.conversations[i].key + '/chats').on('value', resp => {
        this.chats = [];
        this.chats = snapshotToArrayConvers(resp);
        for (let j = this.chats.length - 1; j > 0; j--) {
          let type = this.chats[j].type;
          if (type === "message") {
            let msg = this.chats[j].message;
            let time = this.chats[j].sendDate;
            this.crrConver = this.conversations[i];
            this.crrConver.lastMsg = msg;
            const now = new Date();
            const momentNow = moment(now).format("YYYYMMDD");
            if (moment(time).format("YYYYMMDD") !== momentNow) {
              this.crrConver.lastTime = moment(time).format("DD/MM/YYYY");
            }
            else {
              let date1 = new Date(time).getMinutes();
              let date2 = new Date(now).getMinutes();
              let mins = Number(date2) - Number(date1);
              if (mins <= 1) {
                this.crrConver.lastTime = "Vừa xong";
              }
              else if (mins < 60) {
                this.crrConver.lastTime = mins + " phút trước";
              }
              else {
                date1 = new Date(time).getHours();
                date2 = new Date(now).getHours();
                let hours = Number(date2) - Number(date1);
                this.crrConver.lastTime = hours + "h trước";
              }
            }
            if (this.glb.getUsername() === this.chats[j].user) {
              this.conversations[i].user = "Tôi: ";
            }
            else {
              this.conversations[i].user = this.chats[j].username + ": ";
            }
            this.conversations[i] = this.crrConver;
            console.log(this.conversations[i]);
            break;
          }
        }
      });
    }    
  }
  this.temp = this.conversations;

});

    loading.dismiss();
  }

  addRoom() {
    this.router.navigate(['add-room']);
  }

  joinRoom(key, roomName) {
    this.nickname = this.glb.getUsername();
    this.glb.setRoomName(roomName);
    this.router.navigate(['chat-detail', key, this.nickname]);
}

joinConversation(key, converName){
  this.nickname = this.glb.getUsername();
  this.glb.setconversationName(converName);
  this.router.navigate(['conversation-detail', key, this.nickname]);
}

showModal(){
  this.ctl.showModalAddConversation();
}

}

export const snapshotToArray = snapshot => {
  let returnArr = [];
  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    // let t = childSnapshot.child("message").getValue().toString();
    // console.log(t);
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};

export const snapshotToArrayConvers = snapshot => {
  let returnArr = [];
  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    // let t = childSnapshot.child("message").getValue().toString();
    // console.log(t);
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};
