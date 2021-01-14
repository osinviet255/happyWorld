import { Controller } from 'src/app/BSL/controller';
import { Entities } from './../entities/Entities';
import { Injectable } from '@angular/core';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
  Capacitor
} from '@capacitor/core';
import { ToastController } from '@ionic/angular';

const { PushNotifications, FCMPlugin } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(private glb: Entities,
    private toastCtrl: ToastController,
    private ctl: Controller) { }

  initPush() {
    console.log("Platform: " + Capacitor.platform);
    if (Capacitor.platform !== 'web') {
      this.registerPush();
    }
  }

  private registerPush() {
    PushNotifications.requestPermission().then((permission) => {
      console.log("Run Register")
      if (permission.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        console.log("Topic: " + this.glb.getUsername());
        PushNotifications.register().then(() => {
          FCMPlugin.subscribeTo({ topic: this.glb.getUsername() })
            .then((r) => console.log("Subscribed to Topic: " + this.glb.getUsername()))
            .catch((err) => console.log("Subscriber Topic failed. Error: " + err))
        });
      } else {
        // No permission for push granted
      }
    });

    PushNotifications.addListener(
      'registration',
      (token: PushNotificationToken) => {
        console.log('My token: ' + JSON.stringify(token));
      }
    );

    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification: PushNotification) => {
        console.log('Push received: ' + JSON.stringify(notification));
        console.log('Pushed Data: ' + JSON.stringify(notification.data))
        this.presentToast("Thông báo: " + notification.data.title);
        const dataNotif = notification.data;
        this.presentToast("Thông báo: " + notification.body);
        
        //Update Notification Badge
        // this.glb.setNotifCount(this.glb.getNotifCount() + 1);
        // this.curNotifList = this.glb.getNotifList();
        
        // this.ctl.InsertNotification(this.glb.getUsername(), dataNotif.title, dataNotif.content, dataNotif.shortDes, dataNotif.type);
        //Insert Notification
        // const instObj = {
        //   TITLE: dataNotif.title,
        //   CONTENT: dataNotif.content,
        //   SHORTDES: dataNotif.shortDes,
        //   TYPE: dataNotif.type
        // };
        // let crrList: [];
        // crrList = this.glb.getLstData();
        // crrList.push(instObj);
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification: PushNotificationActionPerformed) => {
        const data = notification.notification.data;
        console.log('Action performed: ' + JSON.stringify(notification.notification));
        // this.ctl.InsertNotification(this.glb.getUsername(), data.title, data.content, data.shortDes, data.type);
        // if (data.detailsId) {
        //     this.router.navigateByUrl(`/tabNotification/${data.detailsId}`);
        // }
      }
    );
  }

  async presentToast(mess) {
    const toast = await this.toastCtrl.create({
      color: 'dark',
      duration: 4000,
      message: mess,
      position: 'top'
      //showCloseButton: true
    });

    await toast.present();
  }
}
