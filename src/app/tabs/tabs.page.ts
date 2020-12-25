import { Controller } from './../BSL/controller';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  tabActive: any;
  iconHome: any;
  iconReport: any;
  iconGroupChat: any;
  iconPersonal: any;
  constructor(private router: Router, private actionShet: ActionSheetController, private ctl: Controller ) {}

  change(event){
    console.log(event);
    
    if(event.tab === "home-page"){
      this.tabActive = "home-page";
      this.iconHome = "../../assets/trangchu/home-actvie.png";
      this.iconReport = "../../assets/trangchu/report-inactive.png";
      this.iconGroupChat = "../../assets/trangchu/groupChat-inactive.png";
      this.iconPersonal = "../../assets/trangchu/personal-inactive.png";
    }
    else if(event.tab === "report"){
      this.tabActive = "report";
      this.iconHome = "../../assets/trangchu/home-inactive.png";
      this.iconReport = "../../assets/trangchu/report-active.png";
      this.iconGroupChat = "../../assets/trangchu/groupChat-inactive.png";
      this.iconPersonal = "../../assets/trangchu/personal-inactive.png";
    }
    else if(event.tab === "group-chat"){
      this.tabActive = "group-chat";
      this.iconHome = "../../assets/trangchu/home-inactive.png";
      this.iconReport = "../../assets/trangchu/report-inactive.png";
      this.iconGroupChat = "../../assets/trangchu/groupChat-active.png";
      this.iconPersonal = "../../assets/trangchu/personal-inactive.png";
    }
    else if(event.tab === "persional"){
      this.tabActive = "persional";
      this.iconHome = "../../assets/trangchu/home-inactive.png";
      this.iconReport = "../../assets/trangchu/report-inactive.png";
      this.iconGroupChat = "../../assets/trangchu/groupChat-inactive.png";
      this.iconPersonal = "../../assets/trangchu/personal-active.png";
    }
  }
  naptien(){
    this.router.navigateByUrl('nap-tien');
  }

  async showActionSheet(){
    let actionSheet = this.actionShet.create({
      header: "Hành động",
      buttons: [
        {
          text: 'Nạp tiền',
          handler: () => {
            this.naptien();
          }
        },
        {
          text: 'Mua cổ phiếu',
          handler: () => {
            this.ctl.showModalBuyStock();
          }
        },
        {
          text: 'Bán cổ phiếu',
          handler: () => {
            console.log('Bán cổ phiếu clicked');
          }
        },
        {
          text: 'Huỷ',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
 
    (await actionSheet).present();
  }

}
