import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private router: Router) {}

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

}
