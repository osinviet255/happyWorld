import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  tabActive: any;
  constructor(private router: Router) {}

  change(event){
    console.log(event);
    
    if(event.tab === "home-page"){
      this.tabActive = "home-page";
    }
    else if(event.tab === "report"){
      this.tabActive = "report";
    }
    else if(event.tab === "group-chat"){
      this.tabActive = "group-chat";
    }
    else if(event.tab === "persional"){
      this.tabActive = "persional";
    }
  }
  naptien(){
    this.router.navigateByUrl('nap-tien');
  }

}
